# SimpleChatBot 🧠💬

A simple yet powerful chatbot server built using JavaScript, Express.js, and the Gemini Generative AI API. This project provides both a landing page interface and RESTful endpoints to generate responses from text, image, document, and audio inputs.

---

## 🚀 Features

- 🌐 Web-based landing page with interactive chatbot UI
- 📥 Accepts various input types: text, image, document, audio
- ⚙️ REST API endpoints for programmatic access (e.g., Postman)
- 🔒 Secure API key configuration using environment variables
- 🛠️ Developer-friendly with hot-reload via Nodemon

---

## 🧱 Tech Stack

### Dependencies

- `@google/generative-ai`: ^0.24.1 - To integrate Google's generative AI capabilities.
- `dotenv`: ^16.5.0 - For loading environment variables from a `.env` file.
- `express`: ^5.1.0 - A web framework for building the server.
- `multer`: ^2.0.1 - For handling multipart/form-data, used for uploading files.
- `cors`: ^2.8.5 - For handling Cross-Origin Resource Sharing (CORS)

### Dev Dependencies

- `nodemon`: ^3.1.10 - A tool to automatically restart the server during development when file changes are detected.

---

## 📦 Prerequisites

To run the project, you will need to create a Gemini API Key. Follow these steps:

1. Visit [Google AI Studio](https://aistudio.google.com/u/0/apikey) to generate an API key.
2. Add your API key to the `.env` file following the example in `.env.example`.

---

## 📁 Project Setup

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/Server-SimpleChatBot.git
cd Server-SimpleChatBot
```

### 2. Install the dependencies:

```bash
npm install
```

### 3. Set up the `.env` file:

Copy the example `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then, open `.env` and add your Google API Key like this:

```
GEMINI_API_KEY=your-api-key-here
```

### 4. Run the server using `nodemon`:

- For production:

  ```bash
  npm start
  ```

- For development:

  ```bash
  npm run dev
  ```

The server will start at `http://localhost:3000` by default.

---

## 🌐 Landing Page

Access the landing page at:

```arduino
http://localhost:3000
```

You can chat with the AI directly via a simple frontend interface integrated with the backend `/api/chat` route.

---

## 📡 API Endpoints

You can also interact with the chatbot programmatically via these `POST` endpoints:

| Endpoint                  | Description                                                |
| ------------------------- | ---------------------------------------------------------- |
| `/generate-text`          | Send text input to generate a response                     |
| `/generate-with-image`    | Upload an image and receive a response                     |
| `/generate-with-document` | Upload a document (e.g., PDF, DOCX) and get a reply        |
| `/generate-with-audio`    | Upload audio and receive a transcribed or contextual reply |
| `/api/chat`               | Chat endpoint used by the landing page                     |

---

## 📄 License

This project is open source and free to use under the [MIT License](LICENSE).

---

## ✨ Acknowledgements

- Powered by [Google Generative AI](https://ai.google.dev/)
- Inspired by the potential of multimodal AI interfaces

---
