import { useMemo } from "react";

const CONFETTI_COLORS = [
  "bg-primary", "bg-secondary", "bg-accent", "bg-coral", "bg-lavender", "bg-mint", "bg-gold"
];

const UNICORN_EMOJIS = ["🦄", "🌈", "⭐", "✨", "💜", "🌸"];

export function ConfettiBackground() {
  const confetti = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 4 + Math.random() * 8,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      shape: i % 3 === 0 ? "rounded-full" : i % 3 === 1 ? "rounded-sm" : "rounded-none",
    })), []);

  const emojis = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 4,
      emoji: UNICORN_EMOJIS[i % UNICORN_EMOJIS.length],
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confetti.map((c) => (
        <div
          key={c.id}
          className={`absolute ${c.color} ${c.shape} opacity-30`}
          style={{
            left: `${c.left}%`,
            top: -20,
            width: c.size,
            height: c.size,
            animation: `confetti-fall ${c.duration}s linear ${c.delay}s infinite`,
          }}
        />
      ))}
      {emojis.map((e) => (
        <div
          key={`emoji-${e.id}`}
          className="absolute text-lg opacity-20"
          style={{
            left: `${e.left}%`,
            top: -30,
            animation: `confetti-fall ${e.duration}s linear ${e.delay}s infinite`,
          }}
        >
          {e.emoji}
        </div>
      ))}
    </div>
  );
}
