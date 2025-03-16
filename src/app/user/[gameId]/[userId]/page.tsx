"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getNormalQuestion,
  getImposterQuestion,
  submitAnswer,
  vote,
} from "@/lib/ gameApi";
import "../../../styles/UserDashboard.css";

export default function UserDashboard() {
  const { gameId, userId } = useParams() as { gameId: string; userId: string };
  const [role] = useState("normal"); // In a real app, this should come from the joinGame result
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [voteUserId, setVoteUserId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchQuestion = async () => {
    try {
      if (role === "imposter") {
        const data = await getImposterQuestion(gameId);
        setQuestion(data.data.imposterQuestion);
      } else {
        const data = await getNormalQuestion(gameId);
        setQuestion(data.data.normalQuestion);
      }
    } catch (err) {
        console.error(err);
      setError("Failed to fetch question");
    }
  };

  useEffect(() => {
    if (!gameId) return;
    fetchQuestion();
  }, [role, gameId]);

  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitAnswer(gameId, userId, answer);
      setMessage("Answer submitted successfully!");
      setAnswer("");
    } catch (err) {
        console.error(err);
        
      setError("Failed to submit answer");
    }
  };

  const handleVote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await vote(gameId, userId, voteUserId);
      setMessage("Vote submitted successfully!");
    } catch (err) {
        console.error(err);
      setError("Failed to submit vote");
    }
  };

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      {error && <div className="error">{error}</div>}
      <div className="question-section">
        <h2>Question:</h2>
        <p>{question || "Waiting for question..."}</p>
      </div>
      <form onSubmit={handleSubmitAnswer} className="answer-form">
        <label>
          Your Answer:
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Answer</button>
      </form>
      <hr />
      <form onSubmit={handleVote} className="vote-form">
        <label>
          Vote (enter userId to kick):
          <input
            type="text"
            value={voteUserId}
            onChange={(e) => setVoteUserId(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Vote</button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
}
