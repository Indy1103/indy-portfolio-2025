'use client';

import React from 'react';
import ExperienceCard from './ExperienceCard'; // Assuming ExperienceCard.tsx is in the same directory

// Define the interface for individual experience/project objects
interface ExperienceItem { // Renamed from Experience for clarity
  id: number;
  companyName: string; // Could be project name or client
  jobTitle: string;    // Could be role or project type
  dates: string;       // Could be project duration or year
  size: 'small' | 'large';
  description: string | string[];
  technologies: string[];
  companyLogo?: string; // Could be a small icon or client logo
  previewImage?: string; // New: For the project preview image
}


// Your experience/project data, typed with the ExperienceItem interface
const experiences: ExperienceItem[] = [
  {
    id: 1,
    companyName: "Student Group Order Managment System",
    jobTitle: "Full-Stack Development",
    dates: "May 2025 - Current",
    size: 'large',
    description: 
      "This project is a comprehensive financial management system designed to streamline the complex financial operations of university student groups. It replaces inefficient spreadsheet and email-based workflows with a centralized platform for managing P-Card requests, Purchase Orders, and internal budgets. The application provides distinct interfaces for students, who can submit and track requests, and faculty supervisors, who have a powerful dashboard for oversight, approvals, and reconciliation with official university financial records. The result is a transparent, accountable, and efficient system that empowers students and simplifies administrative workload for faculty."
    ,
    technologies: ["React", "Next.js", "TypeScript", "Three.js", "TailwindCSS"],
    companyLogo: "/image/UofALogo.jpg", 
    previewImage: "/image/Budget.png" 
  },

  {
    id: 2,
    companyName: "Robotics Navigation System",
    jobTitle: "ROS Development",
    dates: "University Project - 2021",
    size: 'small',
    description: "At SPEAR, I led the software side of our Mars rover project—building a full ROS 2 system with Nav2-based autonomous navigation, custom ArUco detection, and real-time joint control. I wrote ROS nodes to handle GPS, ZED cameras, encoders, and IR sensors, and built a React + Tailwind UI with live camera feeds, six-joint sliders, and autonomy control via ROS Bridge. I also developed a pose-tracking system to control our 6-DOF arm with a point-and-click interface. Everything was tested and deployed for CIRC and URC competitions.",
    technologies: ["ROS", "Python", "C++", "Gazebo"],
    companyLogo: "/image/SPEAR_logo.png", // Example
    previewImage: "/image/group_wave.jpg"
  },
];

export default function WorkExperienceSection() {
  
  const getGridClasses = (size: 'small' | 'large'): string => {
    switch (size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2';
      case 'small':
      default:
        return 'md:col-span-1';
    }
  };

  return (
    <section id="experience" className="py-20 px-4">
      <h2 className="text-4xl sm:text-5xl font-bold text-center text-[#FFFADE] mb-16 font-[Montserrat]">
        Experience
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto md:grid-auto-rows-[1fr]">
        {experiences.map(exp => (
          <div key={exp.id} className={getGridClasses(exp.size)}>
            <ExperienceCard
              companyName={exp.companyName}
              jobTitle={exp.jobTitle}
              dates={exp.dates}
              description={exp.description}
              technologies={exp.technologies}
              companyLogo={exp.companyLogo}
              size={exp.size}
              previewImage={exp.previewImage} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}
