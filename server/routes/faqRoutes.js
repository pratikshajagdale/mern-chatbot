import express from "express";
import { createFaq ,getAllFaqs, searchFaq} from "../controllers/faqController.js";

const router = express.Router();

router.post("/", createFaq);
router.get("/", getAllFaqs);
router.get("/search", searchFaq);

export default router;