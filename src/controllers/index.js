const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "models/gemini-2.0-flash",
  generationConfig: {
    temperature: 0.5,
  },
});

const imageToGenerativePart = (filePath) => ({
  inlineData: {
    data: fs.readFileSync(filePath).toString("base64"),
    mimeType: "image/jpeg",
  },
});

const GenerateText = async (req, res) => {
  try {
    const { prompt } = req.body;
    const data = await model.generateContent(prompt);
    res.status(200).json({ output: data.response.text() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GenerateImage = async (req, res) => {
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
};

const GenerateDocument = async (req, res) => {
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
};

const GenerateAudio = async (req, res) => {
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
};

const ApiChat = async (req, res) => {
  const { userMessage } = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ reply: "Invalid Request" });
  }

  try {
    const data = await model.generateContent(userMessage);
    res.status(200).json({ reply: data.response.text() });
  } catch (err) {
    console.log(err);
    res.status(500).json({ reply: "Internal Server Error" });
  }
};

module.exports = {
  GenerateText,
  GenerateImage,
  GenerateDocument,
  GenerateAudio,
  ApiChat,
};
