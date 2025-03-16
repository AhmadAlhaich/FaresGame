"use client";
import { useState } from "react";
import { joinGame } from "@/lib/ gameApi";
import { useRouter } from "next/navigation";
import "@/styles/JoinGamePage.css";

export default function JoinGamePage() {
  const [gameId, setGameId] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await joinGame(gameId, userName);
      console.log("Joined game:", data);
      const role = data.data.user.role;
      if (role === "admin") {
        router.push(`/admin/${gameId}`);
      } else {
        router.push(`/user/${gameId}/${data.data.user.userId}`);
      }
    } catch (err) {
        console.error(err);
        
      setError("Failed to join game. Please check the game code and try again.");
    }
  };

  return (
    <div className="join-game-container">
      <h1>Join Game</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleJoin} className="join-game-form">
        <label>
          Game Code:
          <input
            type="text"
            value={gameId}
            onChange={(e) => setGameId(e.target.value)}
            required
          />
        </label>
        <label>
          Your Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </label>
        <button type="submit">Join Game</button>
      </form>
    </div>
  );
}
