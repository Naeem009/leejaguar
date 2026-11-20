import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  wide?: boolean;
  className?: string;
};

export function Container({ children, wide = false, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full px-5 md:px-8 ${wide ? "max-w-wide" : "max-w-content"} ${className}`}>
      {children}
    </div>
  );
}
