import type { Metadata } from "next";

import PortfolioPage from "../portfolio-page";

const title = "Сергей Сенченко — технический дизайнер";
const description =
  "Портфолио технического дизайнера: геймплейное программирование, мультиплеерные системы и левел-дизайн на примере проекта Metro W.A.R. RP на DayZ.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/ru/",
    languages: {
      en: "/",
      ru: "/ru/",
      "x-default": "/",
    },
  },
  openGraph: {
    url: "/ru/",
    title,
    description,
    locale: "ru_RU",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og-image-ru.jpg",
        width: 1200,
        height: 630,
        alt: "Сергей Сенченко — технический дизайнер, геймплейный программист, левел-дизайнер",
      },
    ],
  },
  twitter: { title, description, images: ["/og-image-ru.jpg"] },
};

export default function HomeRu() {
  return <PortfolioPage language="ru" />;
}
