import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: "default" | "alt" | "dark";
}

const backgroundStyles = {
  default: "bg-background",
  alt: "bg-background-alt",
  dark: "bg-background-dark text-white",
};

export function Section({
  children,
  id,
  className = "",
  background = "default",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-12 sm:py-16 lg:py-20 ${backgroundStyles[background]} ${className}`}
    >
      {children}
    </section>
  );
}
