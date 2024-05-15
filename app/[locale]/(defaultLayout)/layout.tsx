import Sidebar from "@/components/sidebar";
import "../../globals.css";
import "../../nprogress.css";
import { SessionProvider } from "next-auth/react";
import Providers from "@/components/providers";
import initTranslations from "../../i18n";
import TranslationProvider from "../TranslationProvider";
import { Toaster } from "@/components/ui/toaster";

const i18nNamespaces = ["translation", "nefties"];

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  let jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Neftie App",
    url: "https://neftie.app/",
  };
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          cross-origin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <TranslationProvider
          locale={locale}
          resources={resources}
          namespaces={i18nNamespaces}
        >
          <Providers locale={locale}>
            <div className="w-full mt-0 mb-0 bg-page-bg">
              <div className="bg-page-bg">
                {/* <div className="bg-secondary">MENU</div> */}
                <div className="mr-auto ml-auto">
                  <div className="bg-page-bg">
                    <div className="flex flex-col lg:flex-row">
                      <Sidebar />
                      <div className="bg-[#161618] w-full lg:w-[calc(100%-240px)] pb-24 md:pb-0">
                        {children}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Toaster />
          </Providers>
        </TranslationProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
