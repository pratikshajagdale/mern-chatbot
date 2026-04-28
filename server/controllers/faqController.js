import Faq from "../models/Faq.js";

export const createFaq = async (req, res) => {
  try {
    const faq = await Faq.create(req.body);

    res.status(201).json({
      success: true,
      data: faq,
    });
  } catch (error) {
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