import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateAdmin } from "@/lib/rsvpStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock } from "lucide-react";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAdmin(username, password)) {
      sessionStorage.setItem("aruvi-admin", "true");
      navigate("/admin/dashboard");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-card-foreground">Party Admin</h1>
            <p className="text-muted-foreground text-sm mt-1">Sign in to view RSVPs</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="user">Username</Label>
              <Input
                id="user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                maxLength={50}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pass">Password</Label>
              <Input
                id="pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                maxLength={50}
                required
              />
            </div>
            <Button type="submit" className="w-full">Sign In</Button>
          </form>
        </div>
        <button
          onClick={() => navigate("/")}
          className="block mx-auto mt-4 text-muted-foreground text-sm hover:text-foreground transition-colors"
        >
          ← Back to RSVP
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
