"use client";

import NavBar from "@/components/NavBar";
import HeroOverlay from "@/components/HeroOverlay";
import LandingScene from "@/components/LandingScene";
import ExpertiseCarousel from "@/components/ExpertiseCarousel";
import WorkExperienceSection from "@/components/WorkExperience";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function LandingPage() {
  const isDesktop = useMediaQuery('(min-width: 768px)'); 

  return (
    // The background is now set to the darker blue to match other sections
    <div className="w-screen bg-[#101019]">
      
      {/* HERO SECTION */}
      <div className="relative w-screen h-screen overflow-hidden">
        {/* The 3D scene continues to render only on desktop */}
        {isDesktop && <LandingScene />}
        
        {/* On mobile, we use a different layout to center the HeroOverlay */}
        {!isDesktop && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <HeroOverlay />
          </div>
        )}

        {/* The desktop layout remains the same, but the NavBar is now conditional */}
        {isDesktop && (
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-row">
            <div className="w-1/3">
              {/* NavBar is only rendered on desktop */}
              <NavBar />
            </div>
            <div className="w-2/3 flex items-center justify-center">
              <HeroOverlay />
            </div>
          </div>
        )}
      </div>

      {/* EXPERTISE SECTION */}
      <section
        id="expertise"
        className="w-full py-16 pointer-events-auto bg-[#101019]"
      >
        <ExpertiseCarousel />
      </section>

      {/* EXPERIENCE SECTION */}
      <section
        id="experience"
        className="w-full py-16 pointer-events-auto bg-[#101019]"
      >
        <WorkExperienceSection />
      </section>
    </div>
  );
}