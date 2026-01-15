import GalleryHero from "../components/gallery/GalleryHero";
import GalleryGrid from "../components/gallery/GalleryGrid";

export const metadata = {
  title: "Galerie | Vita Resort",
  description:
    "Discover the Vita Resort suite through our luxury photo gallery.",
};

export default function GaleriePage() {
  return (
    <>
      <GalleryHero />
      <GalleryGrid />
    </>
  );
}
