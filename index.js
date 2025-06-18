const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { buffer } = require("stream/consumers");

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({
  model: "models/gemini-2.0-flash",
  generationConfig: {
    temperature: 0.5,
  },
});

const upload = multer({ dest: "uploads/" });

const port = process.env.PORT || 3000;

app.post("/generate-text", async (req, res) => {
  try {
    const { prompt } = req.body;
    const data = await model.generateContent(prompt);
    console.log(data.response.candidates);
    console.log(data.response.usageMetadata);
    console.log(data.response.functionCalls);
    res.status(200).json({ output: data.response.text() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const imageToGenerativePart = (filePath) => ({
  inlineData: {
    data: fs.readFileSync(filePath).toString("base64"),
    mimeType: "image/jpeg",
  },
});
app.post("/generate-with-image", upload.single("image"), async (req, res) => {
  const prompt = req.body?.prompt || "Describe the image";
  const image = imageToGenerativePart(req.file.path);

  try {
    const data = await model.generateContent([prompt, image]);
    res.status(200).json({ output: data.response.text() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

app.post(
  "/generate-with-document",
  upload.single("document"),
  async (req, res) => {
    const prompt = req.body?.prompt || "Analyze this document:";
    const document = req.file.path;
    const buffer = fs.readFileSync(document);
    const base64Data = buffer.toString("base64");
    const mimeType = req.file.mimetype;

    try {
      const documentPart = {
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      };

      const data = await model.generateContent([prompt, documentPart]);
      res.status(200).json({ output: data.response.text() });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    } finally {
      fs.unlinkSync(document);
    }
  }
);
app.post("/generate-with-audio", upload.single("audio"), async (req, res) => {
  const prompt =
    req.body?.prompt || "Transcribe or analyze the following audio:";
  const audio = req.file.path;
  const buffer = fs.readFileSync(audio);
  const base64Data = buffer.toString("base64");
  const mimeType = req.file.mimetype;

  try {
    const audioPart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType,
      },
    };

    const data = await model.generateContent([prompt, audioPart]);
    res.status(200).json({ output: data.response.text() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    fs.unlinkSync(audio);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
