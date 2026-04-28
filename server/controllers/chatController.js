import Faq from "../models/Faq.js";
import openai from "../config/openai.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Search FAQ first
    const faq = await Faq.findOne(
      {
        $text: { $search: message },
      },
      {
        score: { $meta: "textScore" },
      }
    ).sort({
      score: { $meta: "textScore" },
    });

    // Return FAQ if found
    if (faq) {
      return res.status(200).json({
        success: true,
        source: "faq",
        answer: faq.answer,
        question: faq.question,
      });
    }

    // Fallback to OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful customer support assistant. Answer clearly and concisely.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const aiAnswer = completion.choices[0].message.content;

    return res.status(200).json({
      success: true,
      source: "openai",
      answer: aiAnswer,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};