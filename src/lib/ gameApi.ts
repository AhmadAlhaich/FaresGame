import axios from "axios";

const BASE_URL = "https://us-central1-tasneem-bookshop.cloudfunctions.net/api/faresgame";

export const createGame = async (gameName: string, maxUsers: number) => {
  const response = await axios.post(`${BASE_URL}/create`, { gameName, maxUsers });
  return response.data;
};

export const joinGame = async (gameId: string, userName: string) => {
  const response = await axios.post(`${BASE_URL}/join`, { gameId, userName });
  return response.data;
};

export const getGameStatus = async (gameId: string) => {
  const response = await axios.get(`${BASE_URL}/status`, { params: { gameId } });
  return response.data;
};

export const setQuestions = async (
  gameId: string,
  normalQuestion: string,
  imposterQuestion: string
) => {
  const response = await axios.post(`${BASE_URL}/${gameId}/questions`, {
    normalQuestion,
    imposterQuestion,
  });
  return response.data;
};

export const getNormalQuestion = async (gameId: string) => {
  const response = await axios.get(`${BASE_URL}/${gameId}/questions/normal`);
  return response.data;
};

export const getImposterQuestion = async (gameId: string) => {
  const response = await axios.get(`${BASE_URL}/${gameId}/questions/imposter`);
  return response.data;
};

export const submitAnswer = async (gameId: string, userId: string, answer: string) => {
  const response = await axios.post(`${BASE_URL}/${gameId}/answers`, { userId, answer });
  return response.data;
};

export const getAnswers = async (gameId: string) => {
  const response = await axios.get(`${BASE_URL}/${gameId}/answers`);
  return response.data;
};

export const vote = async (gameId: string, voterId: string, votedUserId: string) => {
  const response = await axios.post(`${BASE_URL}/${gameId}/vote`, { voterId, votedUserId });
  return response.data;
};

export const finishVoting = async (gameId: string) => {
  const response = await axios.post(`${BASE_URL}/${gameId}/finish-voting`);
  return response.data;
};

export const newRound = async (gameId: string) => {
  const response = await axios.post(`${BASE_URL}/${gameId}/new-round`);
  return response.data;
};
