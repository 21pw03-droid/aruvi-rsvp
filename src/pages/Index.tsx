import { RSVPForm } from "@/components/RSVPForm";
import { ConfettiBackground } from "@/components/ConfettiBackground";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen relative overflow-hidden flex flex-col">
      <ConfettiBackground />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-4">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-3">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Star className="w-3 h-3" />
              You're Invited!
              <Star className="w-3 h-3" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-extrabold text-foreground leading-tight">
              🦄 Aruvi turns{" "}
              <span className="inline-block text-transparent bg-clip-text font-black" style={{ backgroundImage: 'linear-gradient(135deg, hsl(330 70% 65%), hsl(280 60% 62%), hsl(210 70% 68%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>3</span>
              ! 🌈
            </h1>
            <p className="text-muted-foreground text-sm mt-1 font-body">
              Join us for a magical celebration!
            </p>
          </div>

          {/* RSVP Card */}
          <div className="bg-card rounded-2xl shadow-xl border border-border p-4 md:p-5">
            <h2 className="text-lg font-display font-bold text-center mb-3 text-card-foreground">
              RSVP 🌟
            </h2>
            <RSVPForm />
          </div>

          {/* Hidden admin link */}
          <div className="text-center mt-2">
            <p className="text-muted-foreground text-xs">
              Made with 💕 for Aruvi
            </p>
            <button
              onClick={() => navigate("/admin")}
              className="text-muted-foreground/20 hover:text-muted-foreground/40 text-xs mt-1 transition-colors cursor-default"
              aria-label="Admin access"
            >
              🎂
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
