import { EggsAttributes } from "@/models/Eggs";
import { NeftiesAttributes } from "@/models/Nefties";
import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

const EggsContext = createContext<{
  eggs: EggsAttributes[];
} | null>(null);

type EggsProviderProps = {
  children: ReactNode;
};

const EggsProvider: React.FC<EggsProviderProps> = ({ children }) => {
  const [eggs, setEggs] = useState<EggsAttributes[]>([]);

  useEffect(() => {
    const fetchEggs = async () => {
      try {
        const eggsRequest = await axios.get("/api/eggs");
        setEggs(eggsRequest.data.data); // Ensure this matches the structure of your response
      } catch (error) {
        console.error("Failed to fetch eggs", error);
      }
    };

    fetchEggs();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <EggsContext.Provider value={{ eggs }}>{children}</EggsContext.Provider>
  );
};

export function useEggs() {
  const context = useContext(EggsContext);
  if (!context) {
    throw new Error("useNefties must be used within a NeftiesProvider");
  }
  return context;
}

export default EggsProvider;
