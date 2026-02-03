import type { Metadata } from "next";
import "./styles/globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import WhatsAppButton from "./components/home/WhatsAppButton";
import CustomCursor from "./components/CustomCursor";

export const metadata: Metadata = {
  title: "Residence Only – Luxury Suites & Apartments in Douala, Cameroon",
  description: "Discover luxury suites and fully furnished apartments in Douala. Book your stay at Residence Only for comfort, elegance, and a premium experience in Cameroon.",
  verification: {
    google: "bJXkDYrsiJmaaLktVaiBHvAUmqLIN1RwcbThCGN_LjE",
  },
  keywords: ["luxury suites Douala", "fully furnished apartments Cameroon", "short-term rental Douala", "Residence Only", "hotel-style suites"],
  openGraph: {
    title: "Residence Only – Luxury Suites in Douala",
    description: "Experience luxury and comfort at Residence Only, the premier destination for fully furnished suites in Douala, Cameroon.",
    url: "https://onlyresidency.com",
    siteName: "Residence Only",
    images: [
      {
        url: "https://onlyresidency.com/hero-forest-suite.JPG", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">

        {/* Custom cursor MUST be mounted */}
        <CustomCursor />

        <Header />

        {/* ONE main, ONE children */}
        <main id="main-content">
          {children}
        </main>

        <Footer />
        <WhatsAppButton />

      </body>
    </html>
  );
}
