'use client'

import Button from "@/components/Button";
import SmallListItem from "@/components/SmallListItem";
import supabase from "@/supabase";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const { nodeId } = useParams();
    const router = useRouter();
    const [parentHubRes, setParentHubRes] = useState<any>({});
    const [nodeRes, setNodeRes] = useState<any>({});
    const [subNodeRes, setSubNodeRes] = useState<any[]>([]);
    useEffect(() => {
        const fetchNode = async () => {
            const { data, error } = await supabase.from('node').select('*').eq('id', nodeId).single();
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
            setNodeRes({
                ...data,
                writer_username: UN?.username
            })
        }
        const fetSubNodeRelatedToNode = async () => {
            const { data, error } = await supabase.from('subnode').select('*').eq('parent_node_id', nodeId)
            if (error) {
                console.error("aaaa",error);
                return;
            }
            
            const writerIds = data.map(h => h.writer_id)
            const { data: users, error: userError } = await supabase.from('users').select('id, username').in('id', writerIds)
            if (userError) {
                console.error(userError)
            }   

            const SubNodesWithUsernames = data.map((subnode) => {
                const writer = users?.find(user => user.id === subnode.writer_id )
                return {
                  ...subnode,
                  writer_username: writer?.username
                }
            })
            setSubNodeRes(SubNodesWithUsernames)
        }
        const fetchParentHub = async () => {
            const { data, error } = await supabase.from('hub').select('*').eq('id', nodeRes.parent_hub_id).single()
            if (error) {
                console.error("ddfdfs:", error);
                return;
            }
            console.log(data)
            setParentHubRes(data)
        }
        const fetchAllDatas = async () => {
            await fetchNode();
            await fetSubNodeRelatedToNode();
            await fetchParentHub()
        }
        fetchAllDatas();
    },[nodeId, nodeRes.parent_hub_id])
    return (
        <div className="ml-20">
            <div className="w-11/12 flex justify-between mt-20">
                <Button className="px-7 py-5 text-[#cccccc]">뒤로가기</Button>
                <div className="flex gap-x-5">
                    <Button onClick={() => router.push(`./${nodeId}/write-subnode`)} className="px-7 py-5">새 서브노드 작성하기</Button>
                    <Button className="px-7 py-5 text-[#4c84ff]">아이디어 추가</Button>
                </div>
            </div>
            <div className="w-11/12 h-fit p-8 bg-[#1e1e1e] border border-[#848484] rounded-3xl mt-10">
                <h2 className="text-4xl text-[#a54cff] font-bold">HUB - {parentHubRes?.title}</h2>
            </div>
            <div className="border border-[#848484] rounded-3xl min-h-[50rem] w-11/12 bg-[#1e1e1e] p-16 mr-20 my-14">
                <h1 className="text-[#4c84ff] font-bold text-6xl">{nodeRes.title}</h1>
                {/* <p className="text-[#cccccc] mt-8">부모 노드: {nodeRes.parent_hub_id}</p> */}
                <p>작성자: {nodeRes.writer_username}</p>
                <p className="text-[#cccccc] mt-16 font-bold text-xl">{nodeRes.content}</p>
                    <p className="text-[#cccccc] mt-72">{subNodeRes.length}개의 SubNode가 있습니다.</p>

            </div>
            <div className="flex flex-wrap gap-10">
                {subNodeRes?.map((key: any) => (
                    <SmallListItem key={key.id} postType="subnode" title={key.title} writer={key.writer_username} subnodeId={key.id} nodeId={key.parent_node_id} hubId={nodeRes.parent_hub_id} tag={nodeRes.title} />
                ))}
            </div>
        </div>
    )
}