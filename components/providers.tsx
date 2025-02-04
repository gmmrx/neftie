// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import EggsProvider from "@/providers/EggsProvider";
import NeftiesProvider from "@/providers/NeftiesProvider";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import VideosProvider from "@/providers/VideosProvider";
import EventsProvider from "@/providers/EventsProvider";
import BossesProvider from "@/providers/BossesProvider";

const Providers = ({ locale, children }) => {
  return (
    <>
      <Suspense>
        <ProgressBar
          height="4px"
          color="#d0364f"
          options={{ showSpinner: false }}
          shallowRouting
        />

        <SessionProvider>
          <EventsProvider locale={locale}>
            <VideosProvider locale={locale}>
              <BossesProvider>
                <NeftiesProvider>
                  <EggsProvider>{children}</EggsProvider>
                </NeftiesProvider>
              </BossesProvider>
            </VideosProvider>
          </EventsProvider>
        </SessionProvider>
      </Suspense>
    </>
  );
};

export default Providers;
