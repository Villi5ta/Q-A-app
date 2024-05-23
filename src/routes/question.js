import express from "express";
import {
  ADD_QUESTION,
  GET_ALL_QUESTIONS,
  GET_QUESTION_BY_ID,
  DELETE_QUESTION_BY_ID,
  ADD_ANSWER_TO_QUESTION,
} from "../controllers/question.js";
import authUser from "../middlewares/auth.js";
import validateData from "../middlewares/dataValidation.js";
import questionSchema from "../validationSchema/question.js";

const router = express.Router();

router.post("/question", validateData(questionSchema), authUser, ADD_QUESTION);
router.get("/question/:id", authUser, GET_QUESTION_BY_ID);
router.get("/questions", authUser, GET_ALL_QUESTIONS);
router.delete("/question/:id", authUser, DELETE_QUESTION_BY_ID);

router.post("/question/:id/answer", authUser, ADD_ANSWER_TO_QUESTION);

//add authuser to GET_QUESTION_ANSWERS

export default router;
