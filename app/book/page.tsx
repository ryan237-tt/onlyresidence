import BookingHero from "./BookingHero";
import BookingNotice from "../components/BookingNotice";
import BookingFlow from "./BookingFlow";
import BookingHelp from "../components/BookingHelp";

export default function BookPage() {
  return (
    <main className="bg-white">
      <BookingHero />
      <BookingNotice />
      <BookingFlow />
      <BookingHelp />
    </main>
  );
}
