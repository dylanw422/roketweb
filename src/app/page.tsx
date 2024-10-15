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
import { cookies } from "next/headers";

async function getAuthStatus() {
  const uuidCookie = cookies().get("uuid");
  const jwtCookie = cookies().get("jwt");

  if (jwtCookie || uuidCookie) {
    return { signedIn: true };
  }

  return { signedIn: false };
}

export default async function Home() {
  const authStatus = await getAuthStatus();
  return (
    <main>
      <Header signedIn={authStatus.signedIn} />
      <Hero />
      <Logos />
      <Problem />
      <Solution />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing signedIn={authStatus.signedIn} />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
