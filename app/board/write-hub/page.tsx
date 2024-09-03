"use client";

import useAuthStore from "@/app/store/AuthStore";
import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/Textarea";
import supabase from "@/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  // 허브
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useAuthStore();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      alert("유저없음");
      return;
    }
    const { data, error } = await supabase.from("hub").insert({
      title: title,
      content: content,
      writer_id: user?.id,
      tags: ["임시태그1"],
      created_at: new Date().toISOString(),
    });
    if (error) {
      console.error(error);
      return;
    }
    console.log(data);
    router.push("/");
  };
  return (
    <div className="ml-20">
      <form onSubmit={handleSubmit}>
        <div className="w-11/12 flex justify-between mt-20">
          <Button className="px-7 py-5 text-[#cccccc]">뒤로가기</Button>
          <Button type="submit" className="px-7 py-5 text-[#a54cff]">
            완료
          </Button>
        </div>
        <div className="border border-[#848484] rounded-3xl min-h-[50rem] w-11/12 bg-[#1e1e1e] p-16 mr-20 mt-14">
          <Input
            placeholder="여기에 제목을 입력하세요."
            className="text-[#a54cff] font-bold text-6xl w-full py-4"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <p className="text-[#cccccc] mt-8">분류: 엔터테인먼트</p>
          <TextArea
            placeholder="여기에 아이디어 내용을 입력하세요."
            className="text-[#cccccc] mt-16 font-bold text-xl w-full h-[50rem] resize-none"
            value={content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setContent(e.target.value)
            }
          />
        </div>
      </form>
    </div>
  );
}
