"use client";

import { VideoAttributes } from "@/models/Videos";
import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

const AdminVideosContext = createContext<{
  videos: VideoAttributes[];
} | null>(null);

type AdminVideosProviderProps = {
  children: ReactNode;
};
const AdminVideosProvider: React.FC<AdminVideosProviderProps> = ({
  children,
}) => {
  const [videos, setVideos] = useState<VideoAttributes[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/api/admin/videos`);
        setVideos(response.data.data);
        console.log(response)
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <AdminVideosContext.Provider value={{ videos }}>
      {children}
    </AdminVideosContext.Provider>
  );
};

export function useAdminVideos() {
  const context = useContext(AdminVideosContext);
  if (!context) {
    throw new Error("useAdminVideos must be used within a AdminVideosProvider");
  }
  return context;
}

export default AdminVideosProvider;
