# Model Context Protocol (MCP) - Software Craft and Testing Community Meetup @ Vivid Planet

This repository serves as a basis for the MCP session at the Software Craft and Testing Community Meetup @ Vivid Planet.

## Main goal

**Build a chatbot that helps you find and book a hotel room**

## Prerequisites

1. Install [Node.js](https://nodejs.org/en/download/) (make sure to have a version >= 20)
2. Recommended: Install [Postman](https://www.postman.com/downloads/) (for testing the MCP server)
3. Clone this repository

## Step 1: Setup

### Setup server

1. Navigate to the `server` folder
2. Install dependencies:

     ```bash
     npm install
     ```

3. Set up the database with dummy data:

    ```bash
    npm run fixtures
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. If it works, you should see the output `🚀 Application is running on: http://localhost:3000`

### (Optional, recommended) Setup postman

You can use postman to test your MCP server and the tools you implement.

1. Install [Postman](https://www.postman.com/downloads/) (for testing the MCP server)
2. Start Postman and connect it to the MCP server

   - Create a free account (MCP is only available for registered users)
   - Click "New" in the top left
   - Select "MCP" in the dialog
   - Choose "HTTP" (instead of "STDIO") and enter `http://localhost:3000/mcp` as the URL
   - Click "Connect"

3. Now you should see a list of tools available in the MCP server (currently only `get_room_details`)

### Setup client

1. Navigate to the `client` folder
2. Install dependencies:

    ```bash
    npm install
    ```

3. Add OpenAI API key:

    Create a `.env.local` file and add the key:

    ```
    OPENAI_API_KEY=api-key-here
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open your browser and navigate to `http://localhost:5173` to access the chatbot interface. If 

   - the server is running 
   - the client is running
   - the OpenAI key is correct
   
   you should now be able to chat with the bot.

## Step 2: Implement the MCP server

1. Open this project in your favorite IDE (e.g. [VSCode](https://code.visualstudio.com/))
2. Check out the code base. Here a brief overview:

    There are two main folders: `client` and `server`.
    
    > The **client** is a simple React chat app that uses [LangChain](https://www.langchain.com/) to connect ChatGPT to our MCP server.
    You don't need to change anything here (except adding env variables in `.env.local`).
    
    > The **server** is where you will do most of the work.
    It is written in [TypeScript](https://www.typescriptlang.org/) and uses the [NestJS](https://nestjs.com/) framework.
    For the MCP server, it uses [MCP-Nest](https://github.com/rekog-labs/MCP-Nest).
    >
    > Within the `/src` folder, there are two main folders: `bookings` and `rooms`.
    Both folders contain an entity and (mostly) empty service and tool classes.
    The service and tool files is where you will do most of the work.

3. Implement whichever tools you think are necessary to achieve the main goal (see above). 

    You also have to implement the business logic for the most part.
    It should be pretty straightforward and Copilot is great at helping you.

4. You can test you tool implementations using Postman

### Example scenarios

Some scenarios you might want to think about:

- Finding a room based on specific criteria (e.g. number of guests, date range, price range, amenities)
- Booking a room
- Canceling a booking
- Modifying a booking (e.g. changing dates, number of guests)
- Asking for details about a specific room (e.g. amenities, size, view)
- Booking multiple rooms at once
- Asking for recommendations based on preferences (e.g. "I want a quiet room with a nice view")
- Asking for cheaper alternatives

## Step 3: Test and optimize the chatbot

You can test the chatbot using the provided client.
Test the scenarios mentioned above and any other scenarios you can think of.

### Tips for debugging and optimizing

To get a better insight into what is happening (what the LLM is doing, what tools are called, etc.) you can check out [LangSmith](https://www.langchain.com/langsmith).
LangSmith is a tool for tracing and debugging LLM applications.
To do so, create a free account and add your LangSmith API key to the `.env.local` file in the `client` folder:

```
LANGSMITH_API_KEY=api-key-here
```

You can then use the LangSmith web interface to see the traces.

## Further experimental ideas

You can spend the whole evening testing and optimizing your tools and chatbot.
But if you are looking for more ideas, here are some:

### Try integrating your MCP server with other clients

Some example ideas:

- Run a local model using [ollama](https://ollama.com/search) (make sure the model supports tools) and use [mcp-cli](https://github.com/chrishayuk/mcp-cli?tab=readme-ov-file#quick-start-with-ollama-default) to connect our MCP server (you need python for that)
- Use [LM Studio](https://lmstudio.ai/) -> a GUI version for running local models with MCP support
- Connect the server to your Github Copilot (see [this guide](https://docs.github.com/en/copilot/how-tos/provide-context/use-mcp/extend-copilot-chat-with-mcp))

### Add authentication and roles 

You can also try to add authentication and roles to your MCP server.
Check out the MCP Nest docs for more info about auth: https://github.com/rekog-labs/MCP-Nest?tab=readme-ov-file#features

You could then restrict certain tools (e.g., you can only book a room if you are authenticated, you can only cancel your own bookings, etc.).
You could also add an admin role that can add or remove rooms, etc.

### Connect a local LLM instead of ChatGPT

(This isn't strictly related to MCP, but could be fun to try out)

You can try to connect the client to a local LLM instead of using remote ChatGPT.
You could use [Ollama](https://ollama.com/) to run a local model.
Make sure to use a model that supports tools (e.g. `gpt-oss`).

You must then adapt `mcpClient.ts` in the `client` folder to connect to your local model instead of OpenAI.
You can use [@langchain/ollama](https://www.npmjs.com/package/@langchain/ollama) for that.
