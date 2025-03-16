import "../styles/globals.css";

export const metadata = {
  title: "Fares Game",
  description: "A fun multiplayer game using a roulette-style mechanic",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
