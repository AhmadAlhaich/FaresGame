"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  getGameStatus,
  setQuestions,
  getAnswers,
  finishVoting,
  newRound,
} from "@/lib/ gameApi";
import "@/styles/AdminDashboard.css";

export default function AdminDashboard() {
  const { gameId } = useParams() as { gameId: string };
  interface GameStatus {
    status: string;
    currentRound: number;
    // Add other properties as needed
  }

  const [gameStatus, setGameStatus] = useState<GameStatus | null>(null);
  const [normalQuestion, setNormalQuestion] = useState("");
  const [imposterQuestion, setImposterQuestion] = useState("");
  interface Answer {
    userId: string;
    answer: string;
  }

  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("setQuestions");

  const fetchGameStatus = async () => {
    try {
      const data = await getGameStatus(gameId);
      setGameStatus(data.data);
    } catch (err) {
        console.error(err);
        
      setError("Failed to fetch game status");
    }
  };

  const handleSetQuestions = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setQuestions(gameId, normalQuestion, imposterQuestion);
      fetchGameStatus();
    } catch (err) {
        console.error(err);
      setError("Failed to set questions");
    }
  };

  const handleFinishVoting = async () => {
    try {
      await finishVoting(gameId);
      fetchGameStatus();
    } catch (err) {
        console.error(err);
      setError("Failed to finish voting");
    }
  };

  const handleNewRound = async () => {
    try {
      await newRound(gameId);
      fetchGameStatus();
    } catch (err) {
        console.error(err);
      setError("Failed to start new round");
    }
  };

  const fetchAnswers = async () => {
    try {
      const data = await getAnswers(gameId);
      setAnswers(data.data.answers);
    } catch (err) {
        console.error(err);
      setError("Failed to fetch answers");
    }
  };

  useEffect(() => {
    if (!gameId) return;
    fetchGameStatus();
    if (tab === "viewAnswers") {
      fetchAnswers();
    }
  }, [tab, gameId]);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard - Game Code: {gameId}</h1>
      {error && <div className="error">{error}</div>}
      <div className="tabs">
        <button
          onClick={() => setTab("setQuestions")}
          className={tab === "setQuestions" ? "active" : ""}
        >
          Set Questions
        </button>
        <button
          onClick={() => setTab("viewAnswers")}
          className={tab === "viewAnswers" ? "active" : ""}
        >
          View Answers
        </button>
        <button
          onClick={() => setTab("voting")}
          className={tab === "voting" ? "active" : ""}
        >
          Voting
        </button>
      </div>

      {tab === "setQuestions" && (
        <div className="set-questions">
          <form onSubmit={handleSetQuestions}>
            <label>
              Normal Question:
              <input
                type="text"
                value={normalQuestion}
                onChange={(e) => setNormalQuestion(e.target.value)}
                required
              />
            </label>
            <label>
              Imposter Question:
              <input
                type="text"
                value={imposterQuestion}
                onChange={(e) => setImposterQuestion(e.target.value)}
                required
              />
            </label>
            <button type="submit">Set Questions</button>
          </form>
        </div>
      )}

      {tab === "viewAnswers" && (
        <div className="view-answers">
          <h2>Submitted Answers</h2>
          {answers.length > 0 ? (
            <ul>
              {answers.map((ans, idx) => (
                <li key={idx}>
                  <strong>User:</strong> {ans.userId} – <strong>Answer:</strong> {ans.answer}
                </li>
              ))}
            </ul>
          ) : (
            <p>No answers submitted yet.</p>
          )}
        </div>
      )}

      {tab === "voting" && (
        <div className="voting">
          <h2>Voting</h2>
          <button onClick={handleFinishVoting}>Finish Voting</button>
          <button onClick={handleNewRound}>Start New Round</button>
          <div className="game-info">
            <p>
              <strong>Game Status:</strong> {gameStatus?.status}
            </p>
            <p>
              <strong>Current Round:</strong> {gameStatus?.currentRound}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
