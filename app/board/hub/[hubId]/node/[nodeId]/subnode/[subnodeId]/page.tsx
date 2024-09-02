'use client'

import Button from "@/components/Button";
import supabase from "@/supabase";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { subnodeId } = useParams();
    const [parentNodeRes, setParentNodeRes] = useState<any>({});
    const [subNodeRes, setSubNodeRes] = useState<any>({});
    useEffect(() => {
        const fetchSubNode = async () => {
            const { data, error } = await supabase.from('subnode').select('*').eq('id', subnodeId).single();
            if (error) {
                console.error("bbbvb",error)
                return;
            }
        
            // writer_id 를 writer_username으로 변환하여 새로운 프로퍼티 추가
            const {data: users, error: userError} = await supabase.from('users').select('id, username').eq('id', data.writer_id)
            if (userError) {
                console.error("kkkkkk",userError)
            }
            const UN = users?.find(user => user.id === data.writer_id)
            setSubNodeRes({
                ...data,
                writer_username: UN?.username
            })
        }

        const fetchParentNode = async () => {
            const { data, error } = await supabase.from('node').select('*').eq('id', subNodeRes.parent_node_id).single()
            if (error) {
                console.error('daslfs', error)
                return;
            }
            console.log(data)
            setParentNodeRes(data)
        }
        
        const fetchAllDatas = async () => {
            await fetchSubNode();
            await fetchParentNode();
        }
        fetchAllDatas();
    },[subnodeId, subNodeRes.parent_node_id])
    return (
        <div className="ml-20">
            <div className="w-11/12 flex justify-between mt-20">
                <Button className="px-7 py-5 text-[#cccccc]">뒤로가기</Button>               
                <Button className="px-7 py-5 text-[#4c84ff]">아이디어 추가</Button>
            </div>
            <div className="w-11/12 h-fit p-8 bg-[#1e1e1e] border border-[#848484] rounded-3xl mt-10">
                <h2 className="text-4xl text-[#4c84ff] font-bold">NODE - {parentNodeRes?.title}</h2>
            </div>
            <div className="border border-[#848484] rounded-3xl min-h-[50rem] w-11/12 bg-[#1e1e1e] p-16 mr-20 my-14">
                <h1 className="text-[#4c84ff] font-bold text-6xl">{subNodeRes.title}</h1>
                {/* <p className="text-[#cccccc] mt-8">부모 노드: {nodeRes.parent_hub_id}</p> */}
                <p>작성자: {subNodeRes.writer_username}</p>
                <p className="text-[#cccccc] mt-16 font-bold text-[20px]">{subNodeRes.content}</p>

            </div>
        </div>
    )
}