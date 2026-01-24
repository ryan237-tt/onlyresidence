import AboutCTA from "../components/about/AboutCTA";
import AboutHero from "../components/about/AboutHero";
import AboutImage from "../components/about/AboutImage";
import AboutPillars from "../components/about/AboutPillars";
import AboutStory from "../components/about/AboutStory";

export const metadata = {
  title: "About Residence Only",
  description:
    "Residence Only is a design-led luxury suite in Douala, built like a home and operated like a hotel.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <AboutImage />
      <AboutStory />
      <AboutPillars />
      <AboutCTA />
    </main>
  );
}
