"use client";
import Input from "@/components/Input";
import SmallListItem from "@/components/SmallListItem";
import supabase from "@/supabase";
import { useEffect, useState } from "react";

export default function Page() {
  const [r, setR] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data: hubData, error } = await supabase
        .from("hub")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error(error);
        return [];
      }
      console.log(hubData);

      const writerIds = hubData.map((h) => h.writer_id);
      const { data: users, error: userError } = await supabase
        .from("users")
        .select("id, username")
        .in("id", writerIds);
      if (userError) {
        console.error(userError);
      }

      const hubsWithUsernames = hubData.map((hub) => {
        const writer = users?.find((user) => user.id === hub.writer_id);
        return {
          ...hub,
          writer_username: writer?.username,
        };
      });
      setR(hubsWithUsernames);
    };
    fetchData();

    const channel = supabase
      .channel("public:hub")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "hub" },
        (payload) => {
          console.log("Change received!", payload);
          fetchData(); // Refresh data on change
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <form>
        <div className="flex mt-10 gap-x-8">
          <Input
            placeholder="여기에 태그를 입력하세요."
            className="w-5/6 h-20"
          />
          <Input type="submit" className="w-0 h-20" value="" />
        </div>
      </form>
      <div className="h-full flex flex-wrap gap-10 mt-14">
        {r?.map((key) => (
          <SmallListItem
            postType="hub"
            key={key.id}
            title={key.title}
            tag={key.tag}
            hubId={key.id}
            writer={key.writer_username}
          />
        ))}
      </div>
    </div>
  );
}
