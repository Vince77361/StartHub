import React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;

  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  className,
  onClick,
}) => {
  // width 지정 필수
  return (
    <button
      type={type}
      onClick={onClick}
      className={twMerge(
        `rounded-3xl bg-[#212121] text-white font-bold text-xl border border-[#848484]`,
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
