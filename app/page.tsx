import type { Metadata } from "next";

import PortfolioPage from "./portfolio-page";

const title = "Sergey Senchenko — Technical Designer";
const description =
  "Technical design, gameplay scripting, and level design portfolio featuring DayZ modding and Metro W.A.R. RP.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ru: "/ru/",
      "x-default": "/",
    },
  },
  openGraph: {
    url: "/",
    title,
    description,
    locale: "en_US",
    alternateLocale: ["ru_RU"],
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sergey Senchenko — technical designer, gameplay scripter, level designer",
      },
    ],
  },
  twitter: { title, description, images: ["/og-image.jpg"] },
};

export default function Home() {
  return <PortfolioPage language="en" />;
}
