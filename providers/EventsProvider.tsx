"use client";
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
import { EventsAttributes } from "@/models/Events";

const EventsContext = createContext<{
  events: EventsAttributes[];
  filter: { locale: string };
  setFilter: (locale: string) => void;
} | null>(null);

type EventsProviderProps = {
  locale: string;
  children: ReactNode;
};
const EventsProvider: React.FC<EventsProviderProps> = ({
  locale,
  children,
}) => {
  const [events, setEvents] = useState<EventsAttributes[]>([]);
  const [filter, setInternalFilter] = useState<{
    locale: string;
  }>({ locale: locale });

  useEffect(() => {
    const fetchEvents = async () => {
      const params = new URLSearchParams();
      if (filter.locale) params.append("locale", filter.locale);

      try {
        const response = await axios.get(`/api/events?${params.toString()}`);
        setEvents(response.data.data);
      } catch (error) {
        console.error("Failed to fetch videos", error);
      }
    };

    fetchEvents();
  }, [filter]);

  const setFilter = (locale: string) => {
    setInternalFilter({ locale });
  };

  return (
    <EventsContext.Provider value={{ events, filter, setFilter }}>
      {children}
    </EventsContext.Provider>
  );
};

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents must be used within a EventsProvider");
  }
  return context;
}

export default EventsProvider;
