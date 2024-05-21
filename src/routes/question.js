import express from "express";
import {
  ADD_QUESTION,
  GET_ALL_QUESTIONS,
  DELETE_QUESTION_BY_ID,
} from "../controllers/question.js";
import authUser from "../middlewares/auth.js";
import validateData from "../middlewares/dataValidation.js";
import questionSchema from "../validationSchema/question.js";

const router = express.Router();

router.post("/question", validateData(questionSchema), authUser, ADD_QUESTION);
router.get("/questions", authUser, GET_ALL_QUESTIONS);
router.delete("/question/:id", authUser, DELETE_QUESTION_BY_ID);

export default router;
