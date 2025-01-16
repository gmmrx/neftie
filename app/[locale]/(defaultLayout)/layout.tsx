import Sidebar from "@/components/sidebar";
import Providers from "@/components/providers";
import initTranslations from "../../i18n";
import TranslationProvider from "../TranslationProvider";
import { Toaster } from "@/components/ui/toaster";
import StatCounter from "statcounter";

import "../../globals.css";
import "../../nprogress.css";
import Topbar from "@/components/topbar";
import Footer from "@/components/footer";

const i18nNamespaces = ["translation", "nefties"];
const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === "PROD";

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
    name: "Neftie GG",
    url: "https://neftie.gg/",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        ></link>
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
                  <div className="bg-page-bg bg-homeBg bg-cover">
                    <Topbar />
                    <div className="flex flex-row">
                      <Sidebar />
                      <div className=" w-full lg:max-w-[77rem] pb-24 md:pb-0 mx-auto">
                        {children}
                      </div>
                    </div>
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
            <Toaster />
          </Providers>
        </TranslationProvider>
        {isProd && <StatCounter sc_project={12998877} sc_security="d944ad70" />}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
