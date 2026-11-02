import { BookVisit } from "@/components/BookVisit";
import { ChalkSeam } from "@/components/home/ChalkSeam";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PricesTeaser } from "@/components/home/PricesTeaser";
import { SaigonMelbourne } from "@/components/home/SaigonMelbourne";

export default function Home() {
  return (
    // Clip, not hidden: a scroll container here would stop the seam's timeline reading the page scroll.
    <div className="surface-card relative overflow-x-clip">
      <Hero />
      <HowItWorks />
      <SaigonMelbourne />
      <PricesTeaser />
      <BookVisit />
      <ChalkSeam />
    </div>
  );
}
