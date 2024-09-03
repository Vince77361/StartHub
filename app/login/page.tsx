'use client'

import Button from "@/components/Button";
import supabase from "@/supabase";
import React, { useState } from "react";
import useAuthStore from "../store/AuthStore";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";

export default function Page() {
    const router = useRouter();
    const { setSession, setUser } = useAuthStore();
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (authError) {
            console.error(authError.message)
            return;
        }
        setSession(authData?.session)
        router.push('/board')
        return { user: authData }
    }
    
    return (     
           <div className="w-full h-full flex flex-col justify-center items-center">
                <form onSubmit={onSubmit}>
                     <div className="flex flex-col gap-y-10 border border-[#848484] p-16 rounded-3xl min-w-[800px]">
                         <h1 className="font-bold text-6xl text-center">StartHub</h1>
                         <p className="font-bold text-2xl text-center">당신의 아이디어를 공유하고, 다른 사람들과 함께하세요.</p>
                         <Input className="px-6 py-4" placeholder="이메일" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                         <Input className="px-6 py-4" placeholder="비밀번호" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                         <Button type="submit" className="bg-[#a54cff] py-4 rounded-2xl border-none">로그인</Button> 
                     </div>
                </form>
           </div>
    )
}