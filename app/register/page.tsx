'use client'

import Button from "@/components/Button";
import supabase from "@/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
    const router = useRouter();
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setComfirm] = useState<string>('')
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username: name,
                }
            }
        })
        if (authError) {
            console.error(authError.message)
            return;
        }

        const { data: userData, error: dbError } = await supabase.from('users').insert({
            username: name,
            email: email,
            bio: ".",
            created_at: new Date().toISOString()
        })

        if (dbError) {
            console.error(dbError.message)
            return;
        }

        
        console.log(userData)
        router.push('/')
    }
    
    return (     
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-y-10">
                <input className="text-black" placeholder="이름" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                <input className="text-black" placeholder="이메일" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                <input className="text-black" placeholder="비밀번호" type="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                <input className="text-black" placeholder="비밀번호 확인" type="password" value={confirm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setComfirm(e.target.value)} />
                <Button type="submit">dd</Button> 
            </div>
        </form>
       
    )
}