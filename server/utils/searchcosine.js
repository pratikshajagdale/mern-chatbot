import Faq from "../models/Faq.js";

const cosineSimilarity = (a, b) => {
  if (!a || !b || a.length !== b.length) return 0;

  let dot = 0,
    magA = 0,
    magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
};

export const searchByCosineSimilarity = async (queryEmbedding) => {
  const faqs = await Faq.find(
    { embedding: { $exists: true, $ne: [] } },
    { question: 1, answer: 1, embedding: 1, category: 1 }
  ).lean();

  const results = faqs
    .map((faq) => ({
      ...faq,
      score: cosineSimilarity(queryEmbedding, faq.embedding),
    }))
    .filter((doc) => doc.score > 0.6) // threshold
    .sort((a, b) => b.score - a.score)
    .slice(0, 3); // top 3

  return results;
};