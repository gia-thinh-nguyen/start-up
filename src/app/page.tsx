import { BookVisit } from "@/components/BookVisit";
import { ChalkSeam } from "@/components/home/ChalkSeam";
import { Hero } from "@/components/home/Hero";
import { Included } from "@/components/home/Included";
import { PricesTeaser } from "@/components/home/PricesTeaser";
import { Saigon } from "@/components/home/Saigon";

export default function Home() {
  return (
    // Clip, not hidden: a scroll container here would stop the seam's timeline reading the page scroll.
    <div className="surface-card relative overflow-x-clip">
      <Hero />
      <Included />
      <Saigon />
      <PricesTeaser />
      <BookVisit />
      <ChalkSeam />
    </div>
  );
}
