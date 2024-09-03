"use client";
import React, { useEffect } from "react";
import useAuthStore from "../store/AuthStore";
import supabase from "@/supabase";

interface SessionProviderProps {
  children: React.ReactNode;
}

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const setSession = useAuthStore((state) => state.setSession);
  const setUser = useAuthStore((state) => state.setUser);
  const setParticipatedIn = useAuthStore((state) => state.setParticipatedIn);

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();
      if (sessionError) {
        console.error(sessionError);
        return;
      }
      setSession(session);
      if (session?.user.email) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("email", session.user.email)
          .single();
        if (userError) {
          console.error(userError);
          return;
        }
        setUser(userData);
        console.log(userData);

        // user 가 참가한 hub 리스트를 찾음.
        const { data: participatedList, error: participatedError } =
          await supabase
            .from("hub")
            .select("title")
            .contains("participants", [userData?.id]);
        if (participatedError) {
          console.error(participatedError);
          return;
        }
        const n = participatedList.map((x) => x.title);
        setParticipatedIn(n);
      }
    };
    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session?.user.email) {
        supabase
          .from("users")
          .select("*")
          .eq("email", session.user.email)
          .single()
          .then(({ data: userData, error }) => {
            if (error) {
              console.error(error);
              setUser(null);
            } else {
              setUser(userData);
            }
          });
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [setSession, setUser]);
  return <>{children}</>;
};

export default SessionProvider;
