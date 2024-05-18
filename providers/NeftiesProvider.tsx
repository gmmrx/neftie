"use client";
import { NeftiesAttributes } from "@/models/Nefties";
import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

const NeftiesContext = createContext<{
  nefties: NeftiesAttributes[];
  fetchNefties: () => void;
} | null>(null);

type NeftiesProviderProps = {
  children: ReactNode;
};

const NeftiesProvider: React.FC<NeftiesProviderProps> = ({ children }) => {
  const [nefties, setNefties] = useState<NeftiesAttributes[]>([]);

  useEffect(() => {
    const fetchNefties = async () => {
      try {
        const neftiesRequest = await axios.get("/api/nefties");
        setNefties(neftiesRequest.data.data); // Ensure this matches the structure of your response
      } catch (error) {
        console.error("Failed to fetch nefties", error);
      }
    };

    fetchNefties();
  }, []); // Empty dependency array ensures this runs only once
  const fetchNefties = async () => {
    try {
      const neftiesRequest = await axios.get("/api/nefties");
      setNefties(neftiesRequest.data.data); // Ensure this matches the structure of your response
    } catch (error) {
      console.error("Failed to fetch nefties", error);
    }
  };
  return (
    <NeftiesContext.Provider value={{ nefties, fetchNefties }}>
      {children}
    </NeftiesContext.Provider>
  );
};

export function useNefties() {
  const context = useContext(NeftiesContext);
  if (!context) {
    throw new Error("useNefties must be used within a NeftiesProvider");
  }
  return context;
}

export default NeftiesProvider;
