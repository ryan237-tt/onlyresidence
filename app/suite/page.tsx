import SuiteHero from "../components/suite/SuiteHero";
import SuiteCTA from "../components/suite/SuiteCTA";
import SuiteFeatures from "../components/suite/SuiteFeatures";
import SuiteGallery from "../components/suite/SuiteGallery";
import SuiteGoodToKnow from "../components/suite/SuiteGoodToKnow";
import SuiteSpecifications from "../components/suite/SuiteSpecifications";

export default function SuitePage() {
  return (
    <main id="main-content">
      <SuiteHero />
      <SuiteGallery />
      <SuiteFeatures />
      <SuiteGoodToKnow />
      <SuiteSpecifications />
      <SuiteCTA />
    </main>
  );
}
