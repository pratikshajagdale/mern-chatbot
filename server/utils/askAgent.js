import openai from "../config/openai.js";

export const askAgent = async (
  systemPrompt,
  message
) => {

  const response =
    await openai.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.7,
    });

  return response.choices[0].message.content;
};