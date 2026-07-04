import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhoItsFor } from "@/components/landing/WhoItsFor";
import { ProductDeepDive } from "@/components/landing/ProductDeepDive";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <WhoItsFor />
        <ProductDeepDive />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
