"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import Image from 'next/image';

const skills = [
  { logo: '/icons/python.svg', title: 'Python' },
  { logo: '/icons/node.svg', title: 'Node.js' },
  { logo: '/icons/react.svg', title: 'React' },
  { logo: '/icons/ros_logo.svg', title: 'ROS' },
  { logo: '/icons/next.svg', title: 'Next.js' },
];

export default function ExpertiseCarousel() {
  return (
    <div className="mx-auto w-full px-4 py-20">
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#FFFADE] mb-16 sm:mb-20 font-[Montserrat]">
        My Tech Stack
      </h2>
      <Swiper
        modules={[EffectCoverflow, Navigation]}
        effect="coverflow"      
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 40,       // Rotation of side slides
          stretch: 0,       // Stretch space between slides (pixels)
          depth: 150,       // Depth offset of side slides (z-axis)
          modifier: 1,      // Effect multiplier
          slideShadows: true, // Enable slide shadows
        }}
        // slidesPerView={1.75}
        // navigation={{ nextEl: '.swiper-button-next-expertise', prevEl: '.swiper-button-prev-expertise' }}
        breakpoints={{
          640: { slidesPerView: 2.5 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 3.5 },
        }}
        wrapperClass="py-8" 
        className="py-128 px-8 overflow-visible"
        watchSlidesProgress={true}
      >
        {skills.map((skill) => (
          <SwiperSlide key={skill.title} className="h-auto">
            <div className="card-inner-wrapper flex flex-col items-center justify-center p-6 bg-slate-800/30 backdrop-blur-lg border border-slate-600/50 group transition-all duration-500 ease-out h-72 sm:h-80 cursor-grab active:cursor-grabbing shadow-xl hover:shadow-[0_0_20px_rgba(78,167,255,0.25)]">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-6 transform group-hover:scale-105 transition-transform duration-300">
                <Image
                  src={skill.logo}
                  alt={`${skill.title} logo`}
                  fill
                  style={{ objectFit: 'contain' }}
                  sizes="(max-width: 640px) 112px, 144px"
                  priority={skills.indexOf(skill) < 3}
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#FFFADE] font-[Montserrat] group-hover:text-[#4EA7FF] transition-colors duration-300">
                {skill.title}
              </h3>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev-expertise text-[#4EA7FF] left-4"></div>
        <div className="swiper-button-next-expertise text-[#4EA7FF] right-4"></div>
      </Swiper>

  
    </div>
  );
}
