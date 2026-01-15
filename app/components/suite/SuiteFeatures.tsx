"use client";

type Item = {
  text: string;
  featured?: boolean;
};

type Section = {
  title: string;
  items: Item[];
};

const sections: Section[] = [
  {
    title: "Bedroom",
    items: [
      { text: "King-size bed with luxury bedding" },
      {
        text: "Floor-to-ceiling windows with forest view directly from the bed",
        featured: true,
      },
      { text: "Circular ceiling with indirect LED lighting" },
      { text: "Walk-in dressing room" },
      { text: "Double curtain system (blackout + sheer)" },
      { text: "Smart lighting scenes adapted to each moment" },
    ],
  },
  {
    title: "Spa Bathroom",
    items: [
      {
        text: "Freestanding bathtub with LED chromotherapy and gold finishes",
        featured: true,
      },
      {
        text: "Mirror TV (mirror when off, screen when on)",
        featured: true,
      },
      {
        text: "U by Moen smart shower with temperature memory",
        featured: true,
      },
      { text: "Smart toilet with automatic lid" },
      { text: "Touchless fixtures" },
      { text: "Dark marble from floor to ceiling" },
      { text: "Sheer curtains for privacy and natural light" },
    ],
  },
  {
    title: "Dining Nook",
    items: [
      { text: "Round marble dining table" },
      { text: "Designer chairs" },
      { text: "Geometric chandelier" },
      { text: "Contemporary wall art" },
    ],
  },
  {
    title: "Balcony",
    items: [
      { text: "Glass balustrade" },
      { text: "Outdoor lounge seating" },
      { text: "View over the greenery of Golf Bastos" },
    ],
  },
  {
    title: "Technology",
    items: [
      {
        text: "55” OLED TV with Netflix, Prime Video & Apple TV+",
        featured: true,
      },
      {
        text: "Ultra-fast Wi-Fi (fiber with Starlink backup)",
      },
      { text: "Enterprise-grade mesh network coverage" },
      { text: "Silent, precision climate control" },
    ],
  },
  {
    title: "Amenities",
    items: [
      { text: "Refrigerator" },
      { text: "Microwave" },
      { text: "Basic kitchen utensils" },
      { text: "Hair dryer" },
      { text: "Biometric safe" },
      { text: "On-site parking" },
    ],
  },
  {
    title: "Security & Environment",
    items: [
      {
        text: "Autonomous solar power system with 45kWh battery",
        featured: true,
      },
      { text: "Smart security cameras" },
      { text: "Dual-layer electrified fencing" },
      { text: "Motion, door and window sensors" },
      { text: "Adjacent to the Presidential Palace entrance" },
      {
        text: "Advanced mosquito protection (UV traps, Anopheles attractants, fragrance-free solutions)",
        featured: true,
      },
      { text: "Smoke and carbon monoxide detectors (Nest)" },
    ],
  },
];

export default function SuiteFeatures() {
  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Title */}
        <h2 className="reveal-up h2-section text-center mb-20 tracking-[-0.015em]">
          What Awaits You
        </h2>

        {/* Sections */}
        <div className="space-y-20">
          {sections.map((section, sectionIndex) => (
            <div
              key={section.title}
              className="reveal-up"
              style={{ animationDelay: `${sectionIndex * 120}ms` }}
            >
              {/* Section title */}
              <h3 className="font-display text-2xl md:text-3xl font-medium mb-10 text-[#8A7A2A]">
                {section.title}
              </h3>

              {/* Items */}
              <ul className="sm:columns-2 column-gap-12 space-y-5 body-lg text-[#3f3f3a]">
                {section.items.map((item, idx) => (
                  <li
                    key={item.text}
                    className={`break-inside-avoid flex items-start gap-4 ${
                      item.featured ? "font-medium text-[#2f2f2a]" : ""
                    }`}
                    style={{ animationDelay: `${idx * 60}ms` }}
                  >
                    {/* Bullet / Star */}
                    <span
                      className={`mt-[1px] flex-shrink-0 ${
                        item.featured
                          ? "text-[#8A7A2A] text-[1.20rem] leading-none"
                          : "h-1.5 w-1.5 rounded-full bg-[#857416]"
                      }`}
                    >
                      {item.featured ? "★" : ""}
                    </span>

                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
