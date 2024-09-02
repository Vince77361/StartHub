'use client'

import Button from "@/components/Button";
import supabase from "@/supabase";
import React, { useState } from "react";
import useAuthStore from "../store/AuthStore";
import { useRouter } from "next/navigation";

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
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-y-10">
                <input className="text-black" placeholder="이메일" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <input className="text-black" placeholder="비밀번호" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <Button type="submit">dd</Button> 
            </div>
        </form>
       
    )
}