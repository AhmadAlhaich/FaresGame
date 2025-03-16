"use client";
import { useState } from "react";
import { createGame } from "@/lib/ gameApi";
import { useRouter } from "next/navigation";
import "@/styles/CreateGamePage.css";

export default function CreateGamePage() {
  const [gameName, setGameName] = useState("");
  const [maxUsers, setMaxUsers] = useState(4);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await createGame(gameName, maxUsers);
      console.log("Game created:", data);
      router.push(`/admin/${data.data.gameId}`);
    } catch (err) {
        console.error(err);
        
      setError("Failed to create game. Please try again.");
    }
  };

  return (
    <div className="create-game-container">
      <h1>Create Game</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="create-game-form">
        <label>
          Game Name:
          <input
            type="text"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
          />
        </label>
        <label>
          Maximum Users:
          <input
            type="number"
            value={maxUsers}
            onChange={(e) => setMaxUsers(Number(e.target.value))}
            min="2"
            required
          />
        </label>
        <button type="submit">Create Game</button>
      </form>
    </div>
  );
}
