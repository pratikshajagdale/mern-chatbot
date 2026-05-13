import { askAgent } from "../utils/askAgent.js";

export const multiAgentChat = async (req, res) => {
  try {
    const interviewerPrompt = `
    You are a frontend technical interviewer.

    Ask interview questions one by one.

    Keep questions short.
    `;

    const candidatePrompt = `
    You are a frontend developer candidate.

    Answer professionally and clearly.
    `;

    let message = "lets start react.js interview";

    const conversation = [];

    for (let i = 0; i < 5; i++) {
      // interviewer speaks
      const interviewerReply = await askAgent(interviewerPrompt, message);

      conversation.push({
        role: "interviewer",
        message: interviewerReply,
      });

      // candidate replies
      const candidateReply = await askAgent(candidatePrompt, interviewerReply);

      conversation.push({
        role: "candidate",
        message: candidateReply,
      });

      // continue conversation
      message = candidateReply;
    }

    res.status(200).json({
      success: true,
      conversation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
