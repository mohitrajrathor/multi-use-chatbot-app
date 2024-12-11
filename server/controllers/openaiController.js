const dotenv = require("dotenv");
dotenv.config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Set up Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper function to ensure we handle the response timeout
const waitForResponse = async (promise, timeout = 30000) => {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), timeout)
  );
  return Promise.race([promise, timeoutPromise]);
};

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    const prompt = `summarize this text: ${text}`;

    // Wait for response with timeout handling
    const response = await waitForResponse(model.generateContent(prompt));
    const data = response.data;

    if (data) {
      console.log(data);
      return res.status(200).json(data);
    } else {
      throw new Error("No data returned from Gemini.");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    const prompt = `write a detailed paragraph about \n${text}`;

    // Wait for response with timeout handling
    const response = await waitForResponse(model.generateContent(prompt));
    const data = response.data;

    if (data) {
      console.log(data);
      return res.status(200).json(data);
    } else {
      throw new Error("No data returned from Gemini.");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    const prompt = `${text}`;

    // Wait for response with timeout handling
    const response = await waitForResponse(model.generateContent(prompt));
    const data = response.data;

    if (data) {
      console.log(data);
      return res.status(200).json(data);
    } else {
      throw new Error("No data returned from Gemini.");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    const prompt = `/* convert these instructions into javascript code \n${text}`;

    // Wait for response with timeout handling
    const response = await waitForResponse(model.generateContent(prompt));
    const data = response.data;

    if (data) {
      console.log(data);
      return res.status(200).json(data);
    } else {
      throw new Error("No data returned from Gemini.");
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
