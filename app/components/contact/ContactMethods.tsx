"use client";

const methods = [
  {
    label: "Call",
    value: "+237 6 59 09 91 78",
    href: "tel:+237659099178",
    icon: "📞",
  },
  {
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/237659099178",
    icon: "💬",
  },
  {
    label: "Email",
    value: "contact@vitaresort.com",
    href: "mailto:contact@vitaresort.com",
    icon: "✉️",
  },
  {
    label: "Address",
    value: "Golf Bastos, Yaoundé",
    href: "https://maps.google.com/?q=3.9104212,11.5004514",
    icon: "📍",
  },
];

export default function ContactMethods() {
  return (
    <section className="pb-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {methods.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            className="reveal-up bg-[#F6F6F6] p-8 rounded-xl text-center hover:bg-[#857416]/10 transition"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="h3-card mb-2">{item.label}</h3>
            <p className="body text-gray-600">{item.value}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
