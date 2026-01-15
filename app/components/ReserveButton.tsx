import Link from "next/link";

export default function ReserveButton({
  onClick,
  fullWidth = false,
}: {
  onClick?: () => void;
  fullWidth?: boolean;
}) {
  return (
    <Link
      href="/book"
      onClick={onClick}
      data-cursor
      aria-label="Reserve the Vita Resort luxury suite"
      className={`
        relative overflow-hidden
        inline-flex items-center justify-center

        bg-[#E6C200] text-black

        ${
          fullWidth
            ? "w-full px-8 py-4"
            : "px-6 sm:px-8 py-3 sm:py-4"
        }

        rounded-full
        font-accent
        text-base sm:text-lg
        font-medium
        tracking-wide

        animate-[reserve-glow_4s_ease-in-out_infinite]

        transition-all duration-300
        hover:-translate-y-[2px]
        hover:shadow-[0_0_25px_rgba(230,194,0,0.45)]
        active:translate-y-0
      `}
    >
      {/* SHIMMER */}
      <span
        className="
          pointer-events-none
          absolute inset-0
          bg-gradient-to-r
          from-transparent
          via-[#fff4b8]/60
          to-transparent
          animate-[reserve-shimmer_5.5s_linear_infinite]
        "
      />

      <span className="relative z-10">
        Reserve
      </span>
    </Link>
  );
}
