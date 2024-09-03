import React, { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  className,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={twMerge(
        `focus:outline-none bg-[#1e1e1e] border border-[#848484] rounded-xl p-4`,
        className
      )}
    />
  );
};

export default TextArea;
