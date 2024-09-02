
import { Session } from "@supabase/auth-helpers-nextjs";
import { create } from "zustand"

interface userType {
    id: number;
    username: string;
    email: string;
    bio: string;
}

interface authStoreType {
    session: Session | null;
    user: userType | null;
    participatedIn: string[];
    setSession: (session: Session | null) => void;
    setUser: (user: userType | null) => void;
    setParticipatedIn: (participatedIn: string[]) => void;
    
}

const useAuthStore = create<authStoreType>((set) => ({
    session: null,
    user: null, // 유저 프로필
    participatedIn: [], // 유저가 참여한 hub 아이디 리스트
    setSession: (session) => set({ session }),
    setUser: (user) => set({ user }),
    setParticipatedIn: (participatedIn) => set({ participatedIn })
}))

export default useAuthStore