import CtaSection from "@/components/sections/CTA";
import Dentists from "@/components/sections/Dentists";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <Services />
      <Dentists />
      <CtaSection />
    </div>
  );
}
