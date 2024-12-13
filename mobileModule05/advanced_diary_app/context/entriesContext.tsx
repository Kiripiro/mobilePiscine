import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Entry } from "@/types/Entry";
import FirebaseService from "@/services/firebaseService";
import { useAuth } from "./authContext";

type EntriesContextType = {
  entries: Entry[];
  addEntry: (entry: Entry) => void;
  deleteEntry: (id: string) => void;
  clearEntries: () => void;
};

const EntriesContext = createContext<EntriesContextType | null>(null);

export const useEntries = () => {
  const context = useContext(EntriesContext);
  if (!context) {
    throw new Error("useEntries must be used within an EntriesProvider");
  }
  return context;
};

type ContextProviderProps = {
  children: ReactNode;
};

export const EntriesProvider = ({ children }: ContextProviderProps) => {
  const firebaseService = new FirebaseService("notes");
  const [entries, setEntries] = useState<Entry[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEntries = async () => {
      if (!user) return;
      const entries = await firebaseService.getDocuments(user.email!);
      if (entries)
        entries.map((entry) => {
          entry.date = entry.date.toDate();
          return entry;
        });
      setEntries(entries as Entry[]);
    };
    fetchEntries();
  }, [user]);

  const addEntry = (entry: Entry) => {
    setEntries([entry, ...entries]);
    const { id, ...data } = entry;
    firebaseService.addDocument(data);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    firebaseService.deleteDocument(id);
  };

  const clearEntries = () => {
    setEntries([]);
  };

  return (
    <EntriesContext.Provider
      value={{ entries, addEntry, deleteEntry, clearEntries }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
