# MCP client - Software Craft and Testing Community Meetup @ Vivid Planet

This is a chatbot client that connects to a Model Context Protocol (MCP) server.

## Setup

1. Install dependencies:

    ```bash
    npm install
    ```
   
2. Add OpenAI API key:

    Create a `.env.local` file and add the key:
        
    ```
    OPENAI_API_KEY=api-key-here
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```
   
4. Open your browser and navigate to `http://localhost:5173` to access the chatbot interface.

5. (Optional) To use [LangSmith](https://www.langchain.com/langsmith) add your LangSmith API key to the `.env.local` file:

    ```
    LANGSMITH_API_KEY=api-key-here
    ```