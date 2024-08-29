// context/QuizContext.js
import React, { createContext, useState } from 'react';
import * as QuizServices from '../services/QuizServices';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);

  const fetchQuizzes = async () => {
    const data = await QuizServices.getQuizzes();
    setQuizzes(data);
  };

  const addQuiz = async (quizData) => {
    const newQuiz = await QuizServices.createQuiz(quizData);
    setQuizzes([...quizzes, newQuiz]);
  };

  const editQuiz = async (id, quizData) => {
    const updatedQuiz = await QuizServices.updateQuiz(id, quizData);
    setQuizzes(quizzes.map(quiz => quiz._id === id ? updatedQuiz : quiz));
  };

  const removeQuiz = async (id) => {
    await QuizServices.deleteQuiz(id);
    setQuizzes(quizzes.filter(quiz => quiz._id !== id));
  };

  const publishQuiz = async (id) => {
    const publishedQuiz = await QuizServices.publishQuiz(id);
    setQuizzes(quizzes.map(quiz => quiz._id === id ? publishedQuiz : quiz));
  };

  return (
    <QuizContext.Provider value={{ quizzes, fetchQuizzes, addQuiz, editQuiz, removeQuiz, publishQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
