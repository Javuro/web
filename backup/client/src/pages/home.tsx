import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import BrandStory from "@/components/landing/brand-story";
import HowItWorks from "@/components/landing/how-it-works";
import CTASection from "@/components/landing/cta-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Hero />
        <Features />
        <BrandStory />
        <HowItWorks />
        <CTASection />
      </main>
    </div>
  );
}