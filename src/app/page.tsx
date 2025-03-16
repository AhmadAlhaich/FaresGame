import Link from "next/link";
import "../styles/App.css";

export default function Home() {
  return (
    <div className="app-container">
      <header>
        <h1>Fares Game</h1>
        <nav>
          <Link href="/create">Create Game</Link> | <Link href="/join">Join Game</Link>
        </nav>
      </header>
      <main>
        <h2>Welcome to Fares Game!</h2>
        <p>Get started by creating or joining a game.</p>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Fares Game</p>
      </footer>
    </div>
  );
}
