'use client'
import React, { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

const Input: React.FC<InputProps> = ({ className, type='text', placeholder, onChange, value }) => {
    return ( 
        <input placeholder={placeholder} onChange={onChange} type={type} value={value} className={twMerge(`px-10 text-[#cccccc] text-xl bg-[#1e1e1e] focus:outline-none border border-[#848484] rounded-2xl`, className)}  />
     );
}
 
export default Input;