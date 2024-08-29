// services/QuizServices.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

export const createQuiz = async (quizData) => {
  const response = await axios.post(`${API_URL}/quizzes`, quizData);
  return response.data;
};

export const getQuizzes = async () => {
  const response = await axios.get(`${API_URL}/quizzes`);
  return response.data;
};

export const updateQuiz = async (id, quizData) => {
  const response = await axios.put(`${API_URL}/quizzes/${id}`, quizData);
  return response.data;
};

export const deleteQuiz = async (id) => {
  const response = await axios.delete(`${API_URL}/quizzes/${id}`);
  return response.data;
};

export const publishQuiz = async (id) => {
  const response = await axios.post(`${API_URL}/quizzes/${id}/publish`);
  return response.data;
};
