export function AreasWaveTop({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none leading-none text-[#fdfff4] ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        fill="none"
        className="block h-20 w-full sm:h-24 lg:h-24"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,100 1200,40 1440,70 L1440,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
