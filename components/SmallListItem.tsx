
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface SmallListItemItemProps {
    title: string;
    writer: string;
    tag: any[];
    hubId: string;
    postType: string;
    nodeId?: string;
    subnodeId?: string;
}

const SmallListItem: React.FC<SmallListItemItemProps> = ({
    title,
    writer,
    tag,
    hubId,
    postType,
    nodeId,
    subnodeId,
}) => {
    const href = postType === "hub" ? `/board/hub/${hubId}`
    : postType === "node" ? `/board/hub/${hubId}/node/${nodeId}`
    : postType === 'subnode' ? `/board/hub/${hubId}/node/${nodeId}/subnode/${subnodeId}` : ""

    const fontColor = postType === "hub" ? "text-[#a54cff]" : "text-[#4c84ff]" ;

    return ( 
        <div className="w-96 h-56 bg-[#1e1e1e] border border-[#848484] rounded-2xl">
            <Link href={href} >
                <h2 className={twMerge("text-2xl text-[#a54cff] font-bold m-6", fontColor)}>{title}</h2>
            </Link>
            <p className="mt-4 ml-6 text-[#bebebe]">분류: {tag}</p>
            <p className="mt-10 ml-6 text-[#bebebe]">작성자: {writer}</p>
        </div>
     );
}
 
export default SmallListItem;