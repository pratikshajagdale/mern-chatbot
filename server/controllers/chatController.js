import Faq from "../models/Faq.js";

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

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

    if (faq) {
      return res.status(200).json({
        success: true,
        found: true,
        answer: faq.answer,
        question: faq.question,
      });
    }

    return res.status(200).json({
      success: true,
      found: false,
      answer:
        "Sorry, I couldn't find an answer to that question.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};