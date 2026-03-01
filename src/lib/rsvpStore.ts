import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase"; // make sure this exports your Firestore instance

// ============================
// RSVP TYPE
// ============================

export interface RSVPEntry {
  id: string;
  name: string;
  attending: boolean;
  adults: number;
  kids: number;
  dietaryPreference: "veg" | "non-veg";
  message: string;
  submittedAt: Timestamp;
}

// ============================
// GET RSVPs
// ============================

export async function getRSVPs(): Promise<RSVPEntry[]> {
  try {
    const q = query(
      collection(db, "rsvps"),
      orderBy("submittedAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();

      return {
        id: docSnap.id,
        name: data.name,
        attending: data.attending,
        adults: data.adults,
        kids: data.kids,
        dietaryPreference: data.dietaryPreference,
        message: data.message,
        submittedAt: data.submittedAt,
      } as RSVPEntry;
    });
  } catch (error) {
    console.error("Error fetching RSVPs:", error);
    return [];
  }
}

// ============================
// ADD RSVP
// ============================

export async function addRSVP(
  entry: Omit<RSVPEntry, "id" | "submittedAt">
): Promise<void> {
  try {
    await addDoc(collection(db, "rsvps"), {
      name: entry.name,
      attending: entry.attending,
      adults: entry.adults,
      kids: entry.kids,
      dietaryPreference: entry.dietaryPreference,
      message: entry.message,
      submittedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding RSVP:", error);
    throw error;
  }
}

// ============================
// DELETE RSVP
// ============================

export async function deleteRSVP(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, "rsvps", id));
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    throw error;
  }
}

// ============================
// KEEP YOUR ADMIN LOGIC BELOW
// ============================

export const ADMIN_ACCOUNTS = [
  { username: "admin", password: "aruvi2026" },
  { username: "anu", password: "anbuisthebest" },
  { username: "anbu", password: "imthebest" },
];

export function validateAdmin(username: string, password: string): boolean {
  return ADMIN_ACCOUNTS.some(
    (a) => a.username === username && a.password === password
  );
}