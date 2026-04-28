import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import faqRoutes from "./routes/faqRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/faqs", faqRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("FAQ Chatbot API Running...");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(console.error);