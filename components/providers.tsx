// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import EggsProvider from "@/providers/EggsProvider";
import NeftiesProvider from "@/providers/NeftiesProvider";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import VideosProvider from "@/providers/VideosProvider";
import AdminVideosProvider from "@/providers/AdminVideosProvider";

const Providers = ({ locale, children }) => {
  return (
    <>
      <Suspense>
        <ProgressBar
          height="4px"
          color="rgb(68, 0, 123)"
          options={{ showSpinner: false }}
          shallowRouting
        />

        <SessionProvider>
          <AdminVideosProvider>
            <VideosProvider locale={locale}>
              <NeftiesProvider>
                <EggsProvider>{children}</EggsProvider>
              </NeftiesProvider>
            </VideosProvider>
          </AdminVideosProvider>
        </SessionProvider>
      </Suspense>
    </>
  );
};

export default Providers;
