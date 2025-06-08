// src/app/landing/page.tsx
"use client";

import NavBar from "@/components/NavBar";
import HeroOverlay from "@/components/HeroOverlay";
import LandingScene from "@/components/LandingScene";
import ExpertiseCarousel from "@/components/ExpertiseCarousel";
import WorkExperienceSection from "@/components/WorkExperience";

export default function LandingPage() {
  return (
    
    <div className="w-screen">
      {/* HERO: full-screen 3D + overlay */}
      <div className="relative w-screen h-screen overflow-hidden">
        <LandingScene />
        <div className="absolute inset-0 z-10 pointer-events-none flex">
          <div className="w-1/3">
            <NavBar />
          </div>
          <div className="w-2/3 flex items-center justify-center">
            <HeroOverlay />
          </div>
        </div>
      </div>

      {/* EXPERTISE: flows right below hero */}
      <section
        id="expertise"
        className="w-full py-16 pointer-events-auto bg-[#101019]"
      >
        <ExpertiseCarousel />
      </section>

      <section
        id="experience"
        className="w-full py-16 pointer-events-auto bg-[#101019]"
      >
        <WorkExperienceSection />
      </section>
    </div>
  );
}