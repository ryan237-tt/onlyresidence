"use client";

export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Autonomous Power",
      text: "Solar system with battery storage. Electricity, day and night.",
    },
    {
      icon: "🦟",
      title: "Advanced Mosquito Protection",
      text: "Multi-layer UV and attractant system. Total peace of mind.",
    },
    {
      icon: "📶",
      title: "Ultra-Fast Wi-Fi",
      text: "Fiber + Starlink. Stable connection everywhere.",
    },
    {
      icon: "💡",
      title: "Intelligent Lighting",
      text: "Lighting scenes adapted to each moment of the day.",
    },
    {
      icon: "🛁",
      title: "Spa Bathroom",
      text: "Chromotherapy bathtub, smart shower, mirror TV.",
    },
    {
      icon: "🌲",
      title: "Forest View",
      text: "Floor-to-ceiling windows. Nature from the bed.",
    },
    {
      icon: "🔒",
      title: "24/7 Security",
      text: "Cameras, electric fence. Adjacent to the Presidential area.",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-16 sm:py-20 md:py-24 bg-white scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section title */}
        <h2 className="h2-section text-center mb-12 sm:mb-16 reveal-up">
          What Makes Vita Different
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item, index) => (
            <div
              key={item.title}
              className="
                p-6 sm:p-8
                rounded-xl
                bg-white
                shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                transition-transform duration-300
                hover:-translate-y-1
                reveal-up
              "
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Icon */}
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                {item.icon}
              </div>

              {/* Card title */}
              <h3 className="h3-card mb-2 sm:mb-3">
                {item.title}
              </h3>

              {/* Card text */}
              <p className="body text-gray-600">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
