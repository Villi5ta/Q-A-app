import { v4 as uuidv4 } from "uuid";
import questionModel from "../models/question.js";

export const ADD_QUESTION = async (req, res) => {
  try {
    const question = new questionModel({
      id: uuidv4(),
      ...req.body,
    });

    const response = await question.save();

    return res
      .status(200)
      .json({ message: "Question has been added", question: response });
  } catch (err) {
    console.log(err);
  }
};

export const GET_ALL_QUESTIONS = async (req, res) => {
  try {
    const questions = await questionModel.find();
    return res.status(200).json({ all_questions: questions });
  } catch (err) {
    console.log(err);
  }
};

export const GET_QUESTION_BY_ID = async (req, res) => {
  try {
    const questions = await questionModel.find();
    const question = questions.filter((q) => q.id === req.params.id);

    if (question.length === 0) {
      return res.status(404).json({ message: "Question not found" });
    }

    return res.json({ question: question[0] });
  } catch (error) {
    console.log("ERROR HANDLED");
    return res
      .status(500)
      .json({ message: "Error detected in getting question" });
  }
};

export const DELETE_QUESTION_BY_ID = async (req, res) => {
  try {
    const question = await questionModel.findOne({ id: req.params.id });

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    if (question.userId !== req.body.userId) {
      return res
        .status(401)
        .json({ message: "Question does not belong to user" });
    }

    const response = await questionModel.deleteOne({ id: req.params.id });

    return res.status(200).json({ message: "Question has been deleted" });
  } catch (err) {
    console.log(err);
  }
};

export const ADD_ANSWER_TO_QUESTION = async (req, res) => {
  try {
    const question = await questionModel.findOne({ id: req.params.id });
    console.log("Controller:", req.body.userId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const answer = {
      text: req.body.text,
      userId: req.body.userId, // Use userId from the auth middleware
    };

    // Push the answer object to the answers array
    question.answers.push(answer);

    // Save the updated question
    await question.save();

    res.status(201).json(question);
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
