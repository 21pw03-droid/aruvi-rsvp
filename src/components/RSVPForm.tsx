import { useState } from "react";
import { addRSVP } from "@/lib/rsvpStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Users, Baby, Heart, Leaf, Drumstick } from "lucide-react";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

export function RSVPForm() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<string>("yes");
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [isVeg, setIsVeg] = useState(false);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showSadDialog, setShowSadDialog] = useState(false);

  const fireConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#c084fc", "#f9a8d4", "#93c5fd", "#6ee7b7", "#fde68a", "#fca5a5"],
    });
  };

  const handleAttendingChange = (value: string) => {
    if (value === "yes") {
      setAttending("yes");
      fireConfetti();
    } else {
      setShowSadDialog(true);
    }
  };

  const confirmNotAttending = () => {
    setAttending("no");
    setShowSadDialog(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    addRSVP({
      name: name.trim(),
      attending: attending === "yes",
      adults: attending === "yes" ? adults : 0,
      kids: attending === "yes" ? kids : 0,
      dietaryPreference: isVeg ? "veg" : "non-veg",
      message: message.trim(),
    });
    setSubmitted(true);
    toast.success("Thank you for your RSVP! 🦄");
  };

  if (submitted) {
    return (
      <div className="text-center py-6 space-y-3">
        <div className="text-5xl animate-float">🦄</div>
        <h3 className="text-2xl font-display font-bold text-foreground">
          {attending === "yes" ? "Yay! See you there! 🌈" : "We'll miss you! 💕"}
        </h3>
        <p className="text-muted-foreground text-sm">
          {attending === "yes"
            ? "Aruvi can't wait to celebrate with you!"
            : "Thank you for letting us know!"}
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            setName("");
            setAttending("yes");
            setAdults(1);
            setKids(0);
            setIsVeg(true);
            setMessage("");
          }}
          variant="outline"
          size="sm"
          className="mt-2"
        >
          Submit another RSVP
        </Button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-primary" />
            Your Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="bg-background/50 border-border h-9"
            maxLength={100}
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold">Will you be attending? 🦄</Label>
          <RadioGroup value={attending} onValueChange={handleAttendingChange} className="flex gap-3">
            <div className="flex items-center space-x-2 bg-primary/10 px-3 py-2 rounded-lg border border-primary/30 cursor-pointer">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes" className="cursor-pointer text-sm font-medium">Ofcourse! we'll be there </Label>
            </div>
            <div className="flex items-center space-x-2 bg-muted px-3 py-2 rounded-lg border border-border cursor-pointer">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no" className="cursor-pointer text-sm font-medium">Sorry, can't make it </Label>
            </div>
          </RadioGroup>
        </div>

        {attending === "yes" && (
          <div className="space-y-3 p-3 bg-muted/50 rounded-xl border border-border">
            <div className="grid grid-cols-2 gap-4">
              {/* Adults Counter */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-secondary" />
                  Adults
                </Label>

                <div className="flex items-center justify-between bg-background/60 border border-border rounded-full px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-muted hover:bg-primary/20 transition"
                  >
                    −
                  </button>

                  <span className="font-bold text-lg">{adults}</span>

                  <button
                    type="button"
                    onClick={() => setAdults((prev) => prev + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-muted hover:bg-primary/20 transition"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Kids Counter */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold flex items-center gap-1.5">
                  <Baby className="w-3.5 h-3.5 text-accent" />
                  Kids
                </Label>

                <div className="flex items-center justify-between bg-background/60 border border-border rounded-full px-3 py-2">
                  <button
                    type="button"
                    onClick={() => setKids((prev) => Math.max(0, prev - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-muted hover:bg-accent/20 transition"
                  >
                    −
                  </button>

                  <span className="font-bold text-lg">{kids}</span>

                  <button
                    type="button"
                    onClick={() => setKids((prev) => prev + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-full bg-muted hover:bg-accent/20 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-1">
              <Label htmlFor="dietary" className="text-sm font-semibold flex items-center gap-2">
                🥗 Dietary Preference
              </Label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsVeg(false)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-l-full text-xs font-bold transition-all border ${!isVeg
                    ? "bg-destructive text-destructive-foreground border-destructive"
                    : "bg-muted text-muted-foreground border-border"
                    }`}
                >
                  <Drumstick className="w-3.5 h-3.5" />
                  Non-Veg
                </button>
                <button
                  type="button"
                  onClick={() => setIsVeg(true)}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-r-full text-xs font-bold transition-all border ${isVeg
                    ? "bg-accent text-accent-foreground border-accent"
                    : "bg-muted text-muted-foreground border-border"
                    }`}
                >
                  <Leaf className="w-3.5 h-3.5" />
                  Veg
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-1">
          <Label htmlFor="message" className="text-sm font-semibold">
            Something you'd like to say to Aruvi 🌟
          </Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write a birthday wish..."
            className="bg-background/50 resize-none h-16"
            rows={2}
            maxLength={300}
          />
        </div>

        <Button type="submit" size="default" className="w-full font-bold rainbow-gradient text-primary-foreground border-0">
          Send RSVP 🦄✨
        </Button>
      </form>

      <Dialog open={showSadDialog} onOpenChange={setShowSadDialog}>
        <DialogContent className="sm:max-w-lg text-center">
          <DialogHeader className="items-center">
            <div className="text-5xl mb-2">🥺</div>
            <DialogTitle className="font-display text-xl">Are you sure you can't make it?</DialogTitle>
            <DialogDescription>
              Aruvi will miss you at her party! 🦄💔
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2 justify-center sm:justify-center">
            <Button
              variant="outline"
              onClick={confirmNotAttending}
            >
              Yes, I can't make it 🥺
            </Button>
            <Button
              onClick={() => {
                setShowSadDialog(false);
                setAttending("yes");
                fireConfetti();
              }}
              className="rainbow-gradient text-primary-foreground border-0 pr-2"
            >
              Wait, I'll be there! 🌈
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
