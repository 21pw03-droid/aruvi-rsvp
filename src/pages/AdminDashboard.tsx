import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getRSVPs, type RSVPEntry } from "@/lib/rsvpStore";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Users,
  Baby,
  UserCheck,
  UserX,
  PartyPopper,
  LogOut,
  MessageSquare,
} from "lucide-react";

const StatCard = ({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: number | string;
  color: string;
}) => (
  <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-display font-bold text-card-foreground">
          {value}
        </p>
      </div>
    </div>
  </div>
);

type SortOption =
  | "all"
  | "attending"
  | "not-attending"
  | "with-kids"
  | "veg"
  | "non-veg";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>("all");

  useEffect(() => {
    if (sessionStorage.getItem("aruvi-admin") !== "true") {
      navigate("/admin");
      return;
    }

    const fetchRsvps = async () => {
      try {
        const data = await getRSVPs();
        setRsvps(data);
      } catch (err) {
        console.error("Failed to load RSVPs:", err);
      }
    };

    fetchRsvps();
  }, [navigate]);

  // ✅ SAFE DATE FORMATTER FOR FIREBASE TIMESTAMP
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "";
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString();
    }
    return new Date(timestamp).toLocaleDateString();
  };

  const attending = rsvps.filter((r) => r.attending);
  const notAttending = rsvps.filter((r) => !r.attending);
  const totalAdults = attending.reduce((sum, r) => sum + r.adults, 0);
  const totalKids = attending.reduce((sum, r) => sum + r.kids, 0);
  const totalGuests = totalAdults + totalKids;

  const filteredRsvps = useMemo(() => {
    switch (sortBy) {
      case "attending":
        return rsvps.filter((r) => r.attending);
      case "not-attending":
        return rsvps.filter((r) => !r.attending);
      case "with-kids":
        return rsvps.filter((r) => r.attending && r.kids > 0);
      case "veg":
        return rsvps.filter((r) => r.dietaryPreference === "veg");
      case "non-veg":
        return rsvps.filter((r) => r.dietaryPreference === "non-veg");
      default:
        return rsvps;
    }
  }, [rsvps, sortBy]);

  const handleLogout = () => {
    sessionStorage.removeItem("aruvi-admin");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-card-foreground flex items-center gap-2">
              <PartyPopper className="w-6 h-6 text-primary" />
              Aruvi's Party Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              {rsvps.length} total responses
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            icon={UserCheck}
            label="Attending"
            value={attending.length}
            color="bg-accent/30 text-accent-foreground"
          />
          <StatCard
            icon={UserX}
            label="Not Attending"
            value={notAttending.length}
            color="bg-destructive/10 text-destructive"
          />
          <StatCard
            icon={Users}
            label="Total Adults"
            value={totalAdults}
            color="bg-primary/10 text-primary"
          />
          <StatCard
            icon={Baby}
            label="Total Kids"
            value={totalKids}
            color="bg-secondary/30 text-secondary-foreground"
          />
        </div>

        <div className="bg-card rounded-xl border border-border p-5 shadow-sm">
          <p className="text-lg font-display font-bold text-card-foreground mb-1">
            🎈 Total Expected Guests
          </p>
          <p className="text-4xl font-display font-extrabold text-primary">
            {totalGuests}
          </p>
          <p className="text-muted-foreground text-sm mt-1">
            {totalAdults} adults + {totalKids} kids
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-display font-bold text-foreground">
              Responses
              <span className="ml-2 text-sm font-body font-normal text-muted-foreground">
                ({filteredRsvps.length} shown)
              </span>
            </h2>
            <Select
              value={sortBy}
              onValueChange={(v) => setSortBy(v as SortOption)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="attending">Attending</SelectItem>
                <SelectItem value="not-attending">Not Attending</SelectItem>
                <SelectItem value="with-kids">With Kids</SelectItem>
                <SelectItem value="veg">Veg</SelectItem>
                <SelectItem value="non-veg">Non-Veg</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredRsvps.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <PartyPopper className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p>No entries match this filter.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRsvps.map((r) => (
                <div
                  key={r.id}
                  className={`bg-card rounded-xl border p-4 shadow-sm ${r.attending ? "border-accent" : "border-border"
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-bold text-card-foreground text-lg">
                        {r.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <p
                          className={`text-sm font-semibold ${r.attending
                            ? "text-accent-foreground"
                            : "text-destructive"
                            }`}
                        >
                          {r.attending ? "✅ Attending" : "❌ Not Attending"}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${r.dietaryPreference === "veg"
                            ? "bg-accent/20 text-accent-foreground"
                            : "bg-destructive/10 text-destructive"
                            }`}
                        >
                          {r.dietaryPreference === "veg"
                            ? "🥬 Veg"
                            : "🍗 Non-Veg"}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(r.submittedAt)}
                    </p>
                  </div>

                  {r.attending && (
                    <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" /> {r.adults} adults
                      </span>
                      <span className="flex items-center gap-1">
                        <Baby className="w-3.5 h-3.5" /> {r.kids} kids
                      </span>
                    </div>
                  )}

                  {r.message && (
                    <p className="text-sm mt-2 text-foreground/80 flex items-start gap-1">
                      <MessageSquare className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      {r.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;