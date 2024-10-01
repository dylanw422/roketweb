import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";
import Features from "@/components/sections/features";
import Footer from "@/components/sections/footer";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import HowItWorks from "@/components/sections/how-it-works";
import Logos from "@/components/sections/logos";
import Pricing from "@/components/sections/pricing";
import Problem from "@/components/sections/problem";
import Solution from "@/components/sections/solution";
import Testimonials from "@/components/sections/testimonials";
import { headers } from "next/headers";

export default async function Home() {
  const userAgent = headers().get("user-agent") || "";
  const isMac = userAgent.includes("Mac");

  return (
    <main>
      <Header isMac={isMac} />
      <Hero />
      <Logos />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
