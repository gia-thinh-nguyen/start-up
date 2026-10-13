import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PricesTeaser } from "@/components/home/PricesTeaser";
import { SaigonMelbourne } from "@/components/home/SaigonMelbourne";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SaigonMelbourne />
      <PricesTeaser />
    </>
  );
}
