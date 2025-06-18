# Server-SimpleChatBot

This project is the server component of the upcoming **Client-SimpleChatBot** project. The server is built using JavaScript with Node.js v22.16.0 and provides various AI-powered routes to interact with the chatbot via text, image, document, and audio inputs.

## Tech Stack

### Dependencies
- `@google/generative-ai`: ^0.24.1 - To integrate Google's generative AI capabilities.
- `dotenv`: ^16.5.0 - For loading environment variables from a `.env` file.
- `express`: ^5.1.0 - A web framework for building the server.
- `multer`: ^2.0.1 - For handling multipart/form-data, used for uploading files.

### Dev Dependencies
- `nodemon`: ^3.1.10 - A tool to automatically restart the server during development when file changes are detected.

## Prerequisites

To run the project, you will need to create a Google API Key. Follow these steps:

1. Visit [Google AI Studio](https://aistudio.google.com/u/0/apikey) to generate an API key.
2. Add your API key to the `.env` file following the example in `.env.example`.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Server-SimpleChatBot.git
    cd Server-SimpleChatBot
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up the `.env` file:

    Copy the example `.env.example` file to `.env`:

    ```bash
    cp .env.example .env
    ```

    Then, open `.env` and add your Google API Key like this:

    ```
    GOOGLE_API_KEY=your-api-key-here
    ```

4. Run the server using `nodemon`:

    ```bash
    npx nodemon index.js
    ```

## API Routes

The server provides the following routes for generating responses from AI:

1. **POST /generate-text**  
   Use this route to request an AI response using a manual text input.

2. **POST /generate-with-image**  
   Use this route to request an AI response based on an uploaded image.

3. **POST /generate-with-document**  
   Use this route to request an AI response using an uploaded document.

4. **POST /generate-with-audio**  
   Use this route to request an AI response using an uploaded audio file.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
