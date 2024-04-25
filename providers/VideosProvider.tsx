import { VideoAttributes } from "@/models/Videos";
import { VideoCategoryAttributes } from "@/models/VideoCategories";
import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

const VideosContext = createContext<{
  videos: VideoAttributes[];
  videoCategories: VideoCategoryAttributes[];
} | null>(null);

type VideosProviderProps = {
  children: ReactNode;
};

const VideosProvider: React.FC<VideosProviderProps> = ({ children }) => {
  const [videos, setVideos] = useState<VideoAttributes[]>([]);
  const [videoCategories, setVideoCategories] = useState<
    VideoCategoryAttributes[]
  >([]);
  useEffect(() => {
    const fetchVideoCategories = async () => {
      try {
        const videosRequest = await axios.get("/api/video-categories");
        setVideoCategories(videosRequest.data.data);
      } catch (error) {
        console.error("Failed to fetch nefties", error);
      }
    };

    fetchVideoCategories();
  }, []);

  return (
    <VideosContext.Provider value={{ videos, videoCategories }}>
      {children}
    </VideosContext.Provider>
  );
};

export function useVideos() {
  const context = useContext(VideosContext);
  if (!context) {
    throw new Error("useVideos must be used within a VideosProvider");
  }
  return context;
}

export default VideosProvider;
