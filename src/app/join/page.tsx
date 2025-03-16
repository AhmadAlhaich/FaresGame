"use client";
import { useState, useEffect } from "react";
import { joinGame } from "@/lib/ gameApi";
import { useRouter } from "next/navigation";
import "@/styles/JoinGamePage.css";

export default function JoinGamePage() {
  const [gameId, setGameId] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Optional: If you want to check localStorage on mount for an existing join for a game,
  // you can implement an effect here if gameId is available.
  useEffect(() => {
    if (gameId) {
      const stored = localStorage.getItem(`join-${gameId}`);
      if (stored) {
        const { userId, role } = JSON.parse(stored);
        // Redirect automatically if join record is found
        if (role === "admin") {
          router.push(`/admin/${gameId}`);
        } else {
          router.push(`/user/${gameId}/${userId}`);
        }
      }
    }
  }, [gameId, router]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the user is already joined in this game
    const stored = localStorage.getItem(`join-${gameId}`);
    if (stored) {
      const { userId, role } = JSON.parse(stored);
      console.log("User already joined:", { userId, role });
      if (role === "admin") {
        router.push(`/admin/${gameId}`);
      } else {
        router.push(`/user/${gameId}/${userId}`);
      }
      return;
    }

    try {
      const data = await joinGame(gameId, userName);
      console.log("Joined game:", data);
      const role = data.data.user.role;
      const userId = data.data.user.userId;

      // Save the join record in localStorage so the user can't join multiple times
      localStorage.setItem(
        `join-${gameId}`,
        JSON.stringify({ userId, role })
      );

      if (role === "admin") {
        router.push(`/admin/${gameId}`);
      } else {
        router.push(`/user/${gameId}/${userId}`);
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
