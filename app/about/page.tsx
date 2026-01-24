import type { Metadata } from "next";
import AboutHero from "../components/about/AboutHero";
import AboutStory from "../components/about/AboutStory";
import AboutPillars from "../components/about/AboutPillars";
import AboutCTA from "../components/about/AboutCTA";
import AboutImage from "../components/about/AboutImage";

export const metadata: Metadata = {
  title: "About Residence Only | Designed First, Built to Last",
  description:
    "Residence Only is a boutique luxury suite designed with precision, calm, and reliability. Discover our philosophy and pillars.",
  openGraph: {
    title: "About Residence Only",
    description:
      "Designed first. Built with precision. Operated with discretion.",
    url: "https://onlyresidency.com/about",
    siteName: "Residence Only",
    images: [
      {
        url: "/images/og/vita-resort-og.jpg",
        width: 1200,
        height: 630,
        alt: "Residence Only – Boutique Luxury Suite",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <AboutHero />
      <AboutStory />
      <AboutImage />
      <AboutPillars />
      <AboutCTA />
    </main>
  );
}
