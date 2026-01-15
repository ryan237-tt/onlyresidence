const pillars = [
  {
    icon: "📐",
    title: "Design Precision",
    text: "Every detail resolved before construction.",
  },
  {
    icon: "🤝",
    title: "Discreet Service",
    text: "Professional, calm, always responsive.",
  },
  {
    icon: "⚙️",
    title: "Reliable Foundations",
    text: "Fast Wi-Fi, constant water, secured power, 24/7 safety.",
  },
  {
    icon: "📍",
    title: "Secure Location",
    text: "Golf Bastos, adjacent to the Presidential Palace.",
  },
];

export default function AboutPillars() {
  return (
    <section className="py-24 bg-[#f7f7f5]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="reveal-up h2-section text-center mb-16">
          Our Pillars
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="reveal-up bg-white p-8 rounded-xl shadow-sm"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-4 text-[#857416]">
                {pillar.icon}
              </div>
              <h3 className="h3-card mb-4">{pillar.title}</h3>
              <p className="body text-gray-700">{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
