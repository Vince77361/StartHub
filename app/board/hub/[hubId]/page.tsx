'use client'
import useAuthStore from "@/app/store/AuthStore";
import Button from "@/components/Button";
import SmallListItem from "@/components/SmallListItem";
import supabase from "@/supabase";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Page(){ // 허브 상세 페이지
    const { hubId } = useParams();
    const { user } = useAuthStore();
    const router = useRouter()
    const [hubRes, setHubRes] = useState<any>({})
    const [nodeRes, setNodeRes] = useState<any>([])
    useEffect(() => {
        const fetchHub = async () => {
        const { data, error } = await supabase.from('hub').select('*').eq('id', hubId).single()
        if (error) {
            console.error(error)
            return;
        }
        
        // writer_id 를 writer_username 으로 변환한 새로운 프로퍼티 추가
        const {data: users} = await supabase.from('users').select('id, username').eq('id', data.writer_id)
        const UN = users?.find(user => user.id === data.writer_id)
        setHubRes({
            ...data,
            writer_username: UN?.username
        })
    }
    const fetchNodeRelatedToHub = async () => {
        const { data: nodeData, error: nodeError } = await supabase.from('node').select('*').eq('parent_hub_id', hubId)
        if (nodeError) {
            console.error(nodeError)
            return;
        }
        setNodeRes(nodeData)
    }
    const fetchAllDatas = async () => {
        await fetchHub()
        await fetchNodeRelatedToHub()
    }
    fetchAllDatas()
    }, [hubId])
    
    const Participate = async () => {
        console.log("participate 함수 호출됨")
        try {
        let copy = [...hubRes.participants].map(Number)
        console.log(copy)
        if (user?.id === hubRes.writer_id) {
            alert("당신은 작성자입니다.")
            return;
        }
        if (copy.includes(Number(user?.id))) {
            alert("이미 참여하셨습니다.")
            return;
        }
        copy.push(Number(user?.id))
        const { error: updateError } = await supabase.from('hub').update({
            participants: copy
        }).eq('id', hubId)
        if (updateError) {
            console.error(updateError)
            return;
        }
        setHubRes((prevHubRes: any) => ({
            ...prevHubRes,
            participants: copy
        }));
        console.log(hubRes)
        alert("참여 완료!")
    } catch(err) {
        console.error("예상치 못한 문제 발견: ", err)
    }
}
    
    return (
        <div className="ml-20">
            <div className="w-11/12 flex justify-between mt-20">
                <Button onClick={() => router.back()} className="px-7 py-5 text-[#cccccc]">뒤로가기</Button>
                <div className="flex gap-x-5">
                    <Button onClick={() => router.push(`./${hubId}/write-node`)} className="px-7 py-5">새 노드 작성하기</Button>
                    <Button onClick={Participate} className="px-7 py-5 text-[#a54cff]">참여하고 싶어요</Button>
                </div>
            </div>
            <div className="border border-[#848484] rounded-3xl min-h-[50rem] w-11/12 bg-[#1e1e1e] p-16 mr-20 my-14">
                <h1 className="text-[#a54cff] font-bold text-6xl">{hubRes?.title}</h1>
                <p>작성자: {hubRes?.writer_username}</p>
                <p className="text-[#cccccc] mt-8">분류: {hubRes?.tag}</p>
                <p className="text-[#cccccc] mt-16 font-bold text-[20px]">{hubRes?.content}</p>
                    <p className="text-[#cccccc] mt-72">{nodeRes?.length}개의 Node가 있습니다.</p>
            </div>
            <div className="flex flex-wrap gap-10">
                {nodeRes?.map((key: any) => (
                    <SmallListItem key={key.id} postType="node" title={key?.title} hubId={key.parent_hub_id} nodeId={key.id} tag={hubRes.title} writer={key.writer_id} />
                ))}
            </div>
        </div>
    )
}