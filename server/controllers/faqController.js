import Faq from "../models/Faq.js";
import { generateEmbedding } from "../utils/embedding.js";

export const createFaq = async (req, res) => {
  try {
    const { question, answer, keywords, category } = req.body;

    // Validate required fields
    if (!question || !answer || !category) {
      return res.status(400).json({
        success: false,
        message: "Question, answer, and category are required",
      });
    }

    // Generate embedding for the question + answer combined
    const textToEmbed = `${question} ${answer}`;
    const embedding = await generateEmbedding(textToEmbed);

    // Create FAQ with embedding
    const faq = await Faq.create({
      question,
      answer,
      keywords: keywords || [],
      category,
      embedding,
    });

    res.status(201).json({
      success: true,
      message: "FAQ created successfully with embedding",
      data: faq,
    });
  } catch (error) {
    console.error("Create FAQ error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





export const getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const searchFaq = async (req, res) => {
  try {
    const { query } = req.query;

    const faqs = await Faq.find(
      {
        $text: {
          $search: query,
        },
      },
      {
        score: {
          $meta: "textScore",
        },
      }
    ).sort({
      score: {
        $meta: "textScore",
      },
    });

    res.status(200).json({
      success: true,
      count: faqs.length,
      data: faqs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};