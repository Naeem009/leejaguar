import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  wide?: boolean;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full px-5 md:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
