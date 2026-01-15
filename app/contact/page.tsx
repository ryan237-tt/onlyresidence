import type { Metadata } from "next";
import ContactHero from "../components/contact/ContactHero";
import ContactMethods from "../components/contact/ContactMethods";
import ContactMap from "../components/contact/ContactMap";
import ContactVideos from "../components/contact/ContactVideos";
import ContactCTA from "../components/contact/ContactCTA";

export const metadata: Metadata = {
  title: "Contact & Directions | Vita Resort Golf Bastos",
  description:
    "Call, WhatsApp, or get step-by-step directions to Vita Resort. Located in Golf Bastos, Yaoundé.",
  openGraph: {
    title: "Contact Vita Resort",
    description:
      "Phone, WhatsApp, map, and guided directions to Vita Resort Golf Bastos.",
    url: "https://vitaresort.com/contact",
    siteName: "Vita Resort",
    images: [
      {
        url: "/images/og/vita-resort-og.jpg",
        width: 1200,
        height: 630,
        alt: "Vita Resort location",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <ContactHero />
      <ContactMethods />
      <ContactMap />
      <ContactVideos />
      <ContactCTA />
    </main>
  );
}
