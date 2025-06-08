import React from 'react';
import Image from 'next/image';

// Define the interface for the props this component expects
interface ExperienceCardProps {
  companyName: string; // Could be project name or client
  jobTitle: string;    // Could be role or project type
  dates: string;       // Could be project duration or year
  description: string | string[]; // Can be a paragraph or bullet points
  technologies: string[];
  companyLogo?: string; // Optional property
  size?: 'small' | 'large'; // Optional size prop to adjust internal styling
  previewImage?: string; // Optional: For the project preview image
}

export default function ExperienceCard(props: ExperienceCardProps){
  const isLarge = props.size === 'large';

  // Define size-specific classes
  const cardPadding = isLarge ? 'p-8' : 'p-6';
  const logoContainerSize = isLarge ? 'w-16 h-16' : 'w-12 h-12'; // For company/client logo
  const companyTitleSize = isLarge ? 'text-xl' : 'text-lg';
  const jobTitleSize = isLarge ? 'text-2xl' : 'text-xl';
  const descriptionTextSize = isLarge ? 'text-base' : 'text-sm';
  const previewImageHeight = isLarge ? 'h-64 sm:h-72' : 'h-48 sm:h-56'; // Taller preview for large cards

  return (
    <div className={`
      flex flex-col 
      bg-slate-800/40 backdrop-blur-lg /* Slightly increased opacity for glass */
      rounded-2xl border border-slate-700/60 /* More defined border */
      transition-all duration-300 ease-in-out
      hover:border-[#4EA7FF]/70 hover:shadow-[0_0_30px_rgba(78,167,255,0.25)] /* Enhanced hover shadow */
      overflow-hidden /* Important to clip the preview image within rounded corners */
    `}>
      {/* Project Preview Image Section */}
      {props.previewImage && (
        <div className={`relative w-full ${previewImageHeight} bg-slate-700/50`}>
          <Image
            src={props.previewImage}
            alt={`${props.companyName} preview`}
            fill
            style={{ objectFit: 'cover' }} // 'cover' will fill the area, 'contain' shows whole image
            sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        </div>
      )}

      {/* Content Section with Padding */}
      <div className={`flex flex-col flex-grow ${cardPadding}`}>
        {/* Card Header: Logo, Company, and Dates */}
        <div className="flex items-start mb-4"> {/* Changed to items-start for better alignment with multi-line titles */}
          {props.companyLogo && (
            <div className={`relative ${logoContainerSize} mr-4 rounded-md overflow-hidden bg-white/10 flex-shrink-0 mt-1`}>
              <Image src={props.companyLogo} alt={`${props.companyName} logo`} fill style={{ objectFit: 'contain' }} />
            </div>
          )}
          <div className="flex-grow">
            <h3 className={`${companyTitleSize} font-bold text-[#FFFADE] font-[Montserrat]`}>{props.companyName}</h3>
            <p className="text-sm text-slate-400 font-[RobotoMono,monospace]">{props.dates}</p>
          </div>
        </div>

        {/* Job Title / Project Type */}
        <h4 className={`${jobTitleSize} font-semibold text-slate-100 mb-3`}>{props.jobTitle}</h4>

        {/* Description Section */}
        <div className={`flex-grow mb-5 text-slate-300 ${descriptionTextSize}`}>
          {Array.isArray(props.description) ? (
            <ul className="list-disc list-inside space-y-1.5">
              {props.description.map((point, index) => (
                <li key={index} className="leading-relaxed">
                  {point}
                </li>
              ))}
            </ul>
          ) : (
            <p className="leading-relaxed">
              {props.description}
            </p>
          )}
        </div>

        {/* Technologies Section */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-700/50 mt-auto"> {/* mt-auto pushes tech to bottom */}
          {Array.isArray(props.technologies) && props.technologies.map((tech) => (
            <span key={tech} className={`bg-[#4EA7FF]/10 text-[#4EA7FF] ${isLarge ? 'text-sm px-3 py-1.5' : 'text-xs px-3 py-1'} font-semibold rounded-full`}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
