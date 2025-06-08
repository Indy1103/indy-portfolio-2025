import React, { useState } from "react";
const items = [
  { label: "// Home", id: "home" },
  { label: "// Expertise", id: "expertise" },
  { label: "// Experience", id: "experience" },
];

export default function NavBar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <nav
      className="h-full pointer-events-auto"
      style={{ background: "transparent" }}
    >
      <ul
        className="flex flex-col h-full justify-center items-start m-5 p-20 list-none"

      >
        {items.map((item, index) => (
          <li
            key={item.id}
            onClick={() => {
            const el = document.getElementById(item.id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
  }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="py-5 "
            style={{
              transition: "color 0.2s ease, transform 0.2s ease",
              fontFamily: "Roboto Mono, monospace",
              fontSize: "28px",
              fontWeight: 400,
              color:
                hoveredIndex === null || hoveredIndex === index
                  ? "#4EA7FF"
                  : "#FFFADE",
              transform: hoveredIndex === index ? "scale(1.1)" : "scale(1)",
              cursor: "pointer",
            }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
