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
  filter: { locale: string; categoryId: number | null };
  setFilter: (locale: string, categoryId: number | null) => void;
} | null>(null);

type VideosProviderProps = {
  children: ReactNode;
};
const VideosProvider: React.FC<VideosProviderProps> = ({ children }) => {
  const [videos, setVideos] = useState<VideoAttributes[]>([]);
  const [filter, setInternalFilter] = useState<{
    locale: string;
    categoryId: number | null;
  }>({ locale: "en", categoryId: null });
  const [videoCategories, setVideoCategories] = useState<
    VideoCategoryAttributes[]
  >([]);

  useEffect(() => {
    const fetchVideoCategories = async () => {
      try {
        const videosRequest = await axios.get("/api/video-categories");
        setVideoCategories(videosRequest.data.data);
      } catch (error) {
        console.error("Failed to fetch video categories", error);
      }
    };
    fetchVideoCategories();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      const params = new URLSearchParams();
      if (filter.locale) params.append("locale", filter.locale);
      if (filter.categoryId)
        params.append("catId", filter.categoryId.toString());

      try {
        const response = await axios.get(`/api/videos?${params.toString()}`);
        setVideos(response.data.data);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };
    console.log(filter);
    fetchVideos();
  }, [filter]);

  const setFilter = (locale: string, categoryId: number | null) => {
    setInternalFilter({ locale, categoryId });
  };

  return (
    <VideosContext.Provider
      value={{ videos, videoCategories, filter, setFilter }}
    >
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
