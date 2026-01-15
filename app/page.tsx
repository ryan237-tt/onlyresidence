import Hero from "./components/home/Hero";
import Features from "./components/home/Features";
import DesignTech from "./components/home/DesignTech";
import Location from "./components/home/Location";
import FinalCTA from "./components/home/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <DesignTech />
      <Location />
      <FinalCTA />
      {/* Next sections will go here */}
    </>
  );
}
