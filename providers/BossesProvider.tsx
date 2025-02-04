"use client";
import { BossesAttributes } from "@/models/Bosses";
import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface GroupedBosses {
  ELITE: BossesAttributes[];
  BOSS: BossesAttributes[];
}

const BossesContext = createContext<{
  bosses: GroupedBosses;
  fetchBosses: () => void;
} | null>(null);

type BossesProviderProps = {
  children: ReactNode;
};

const BossesProvider: React.FC<BossesProviderProps> = ({ children }) => {
  const [bosses, setBosses] = useState<GroupedBosses>({
    ELITE: [],
    BOSS: [],
  });

  const fetchBosses = async () => {
    try {
      const bossesRequest = await axios.get("/api/bosses");
      setBosses(bossesRequest.data.data);
    } catch (error) {
      console.error("Failed to fetch bosses", error);
    }
  };

  useEffect(() => {
    fetchBosses();
  }, []);

  return (
    <BossesContext.Provider value={{ bosses, fetchBosses }}>
      {children}
    </BossesContext.Provider>
  );
};

export function useBosses() {
  const context = useContext(BossesContext);
  if (!context) {
    throw new Error("useBosses must be used within a BossesProvider");
  }
  return context;
}

export default BossesProvider;
