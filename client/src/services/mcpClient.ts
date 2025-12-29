import { type DynamicStructuredTool } from '@langchain/core/tools';
import { createReactAgent } from '@langchain/langgraph/prebuilt';
import { loadMcpTools } from '@langchain/mcp-adapters';
import { ChatOpenAI } from '@langchain/openai';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';

export class MCPChatClient {
  private client: Client | null = null;
  private model: ChatOpenAI | null = null;
  private agent: ReturnType<typeof createReactAgent> | null = null;
  private isConnected = false;
  private availableTools: DynamicStructuredTool[] = [];

  async initialize() {
    try {
      // Initialize the Azure OpenAI model
      this.model = new ChatOpenAI({
        model: 'gpt-4o',
        openAIApiKey: process.env.OPENAI_API_KEY,
      });

      // Create transport for a local HTTP MCP server
      const transport = new StreamableHTTPClientTransport(
        new URL('http://localhost:3000/mcp'),
      );

      // Initialize the client
      this.client = new Client({
        name: 'hotel-mcp-client',
        version: '1.0.0',
      });

      // Connect to the transport
      await this.client.connect(transport);

      // Get tools with custom configuration using loadMcpTools
      const tools = await loadMcpTools('hotel', this.client);
      this.availableTools = tools;

      // Create the React agent with the loaded tools
      this.agent = createReactAgent({
        llm: this.model,
        tools: tools,
      });

      this.isConnected = true;

      return {
        success: true,
        message: `MCP client connected successfully! Loaded ${tools.length} tools from your local server.`,
        tools: tools,
      };
    } catch (error) {
      console.error('Failed to initialize MCP client:', error);
      return { success: false, message: `Failed to initialize: ${error}` };
    }
  }

  async sendMessage(
    currentMessage: string,
    messageHistory?: Array<{ role: string; content: string }>,
  ) {
    if (!this.agent || !this.isConnected) {
      throw new Error('MCP client not initialized');
    }

    try {
      // Use the React agent to handle the message and tool calling automatically
      // If we have message history, use it; otherwise fall back to just the current message
      const messagesToSend =
        messageHistory && messageHistory.length > 0
          ? messageHistory
          : [{ role: 'user', content: currentMessage }];

      const currentDateSystemMessage = `## Current Date\n${new Date().toLocaleDateString()}`;

      const systemMessage = {
        role: 'system',
        content: `You are a helpful hotel assistant with access to MCP tools.
You can provide information about rooms, availability, and create bookings.
If the user asks something that's hotel related, use the tools to get accurate information.

Only answer if you are sure about the answer. If you are not sure, say "I don't know".

${currentDateSystemMessage}
Only return your answer in JSON format like this: {"final": "<answer>"}. Do not include any other text or fields.`,
      };

      // Insert system message at the beginning if not already present
      const messagesWithSystem =
        messagesToSend[0]?.role === 'system'
          ? messagesToSend
          : [systemMessage, ...messagesToSend];

      const response = await this.agent.invoke({
        messages: messagesWithSystem,
      });

      // Extract the final message from the agent response
      const lastMessage = response.messages[response.messages.length - 1];
      let content = lastMessage.content;

      // Try to parse JSON response
      try {
        const parsed = JSON.parse(content);
        if (parsed.final) {
          content = parsed.final;
        } else if (parsed.reasoning && parsed.final === undefined) {
          // Fallback if only reasoning is provided
          content = parsed.reasoning;
        }
      } catch (jsonError) {
        console.log(
          'Failed to parse JSON response, using raw content:',
          jsonError,
        );
        // If JSON parsing fails, use the original content as fallback
      }

      return {
        success: true,
        content: content,
        fullResponse: response,
      };
    } catch (error) {
      console.error('Error sending message:', error);
      return {
        success: false,
        content: `Error: ${error}`,
        fullResponse: null,
      };
    }
  }

  getAvailableTools() {
    return this.availableTools;
  }

  async disconnect() {
    if (this.client) {
      try {
        await this.client.close();
        this.isConnected = false;
        this.client = null;
        this.model = null;
      } catch (error) {
        console.error('Error disconnecting:', error);
      }
    }
  }

  getConnectionStatus() {
    return this.isConnected;
  }
}

export const mcpClient = new MCPChatClient();
