import type { Metadata } from "next";
import "./styles/globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import WhatsAppButton from "./components/home/WhatsAppButton";
import CustomCursor from "./components/CustomCursor";


export const metadata: Metadata = {
  title: "Vita Resort",
  description: "Luxury resort experience",
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
