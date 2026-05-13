import Faq from "../models/Faq.js";
import openai from "../config/openai.js";
import { generateEmbedding } from "../utils/embedding.js";
import { searchByCosineSimilarity } from "../utils/searchcosine.js";

const buildContext = (docs) => {
  if (!docs || docs.length === 0) {
    return "No relevant FAQ found.";
  }

  return docs
    .map(
      (doc) => `Q: ${doc.question}
A: ${doc.answer}`,
    )
    .join("\n\n");
};

export const chatWithBot = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const queryEmbedding = await generateEmbedding(message);

    // const contextDocs = await searchByCosineSimilarity(queryEmbedding);
    const contextDocs = await Faq.aggregate([
  {
    $vectorSearch: {
      index: "faq_index",
      path: "embedding",
      queryVector: queryEmbedding,
      numCandidates: 100,
      limit: 3
    }
  }
]);

    const context = buildContext(contextDocs);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a helpful and friendly customer support assistant.

Use the provided context to answer the user's question.

Rules:
- Do NOT copy the answer exactly
- Rewrite the answer in a natural, conversational way
- Keep it simple and clear
- If answer is not found, say "I don't have that information"
`,
        },
        {
          role: "user",
          content: `
Context:
${context}

Question:
${message}
          `,
        },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    const aiAnswer = completion.choices[0].message.content;

    return res.status(200).json({
      success: true,
      answer: aiAnswer,
      retrievedCount: contextDocs.length,
    });
  } catch (error) {
    console.error("Chat error:", error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
