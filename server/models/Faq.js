import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    keywords: {
      type: [String],
      required: true,
      default: [],
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    // Vector embedding for semantic search
    embedding: {
      type: [Number],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Full-text search index
faqSchema.index({
  question: "text",
  answer: "text",
  keywords: "text",
});

// Vector search index for MongoDB Atlas Vector Search
faqSchema.index({
  embedding: "cosmosSearch",
  cosmosSearchOptions: {
    kind: "vector-ivf",
    similarity: "COS",
    dimensions: 1536,
  },
});

export default mongoose.model("Faq", faqSchema);