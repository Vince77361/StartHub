'use client'
import React from "react";
import ParticipatedList from "./ParticipatedList";

import supabase from "@/supabase";
import useAuthStore from "@/app/store/AuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";


const SideBar: React.FC = () => {
    const { user, setUser, setSession, participatedIn, setParticipatedIn } = useAuthStore()
    const router = useRouter();
    
    const Logout = async () => {
        const { error: LogoutError } = await supabase.auth.signOut();
        if (LogoutError) {
            console.error(LogoutError)
            return;
        }

        setUser(null);
        setSession(null);
        setParticipatedIn([])
        router.push('/login')
    }
    return ( 
        <div className="w-96 h-screen bg-[#121212] border border-[#848484] rounded-r-2xl sticky top-0 mr-10 px-6 py-10 flex flex-col">
            <h3 className="text-2xl font-bold">{user?.username ? `${user?.username}님, 환영합니다!` : '로그인 해 주세요.'}</h3>
            <p className="mt-4">이곳에서 새로운 아이디어를 찾아 보세요.</p>
            <h3 className="text-2xl font-bold mt-20">참여 중인 프로젝트 (Hub)</h3>
            <ParticipatedList participant={participatedIn || []} />
            <div className="flex flex-col gap-y-4">
                <Link href="/board/write-hub">
                    <p className="text-[20px] font-bold">새 아이디어 만들기</p>
                </Link>
                <p className="text-[20px] font-bold">내 정보</p>
                <p onClick={Logout} className="text-[20px] text-red-500 font-bold">로그아웃</p>
            </div>
        </div>
     );
}

 
export default SideBar;