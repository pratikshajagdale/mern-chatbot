import openai from "../config/openai.js";

/**
 * @param {string} text - The text to embed
 * @returns {Promise<Array<number>>} - The embedding vector
 */
export const generateEmbedding = async (text) => {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small", 
      input: text
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw error;
  }
};


