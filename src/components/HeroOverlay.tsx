import React from "react";

export default function HeroOverlay() {
  return (
    <div className="flex flex-col items-center justify-center pointer-events-none gap-4 text-center p-4">
      <h1 className="text-6xl md:text-8xl font-extrabold text-[#FFFADE] mb-2 md:mb-4 font-[Montserrat] text-shadow-md">
        Indy Gedara
      </h1>
      <p className="text-xl md:text-2xl text-[#FFFADE] font-[Montserrat] font-bold text-shadow-md">
        Software Engineer
      </p>
    </div>
  );
}