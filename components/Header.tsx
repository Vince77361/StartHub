import Link from "next/link";

const Header = () => {
    return ( 
        <div className="w-full h-24 flex items-center px-24 bg-[#222222] border-[#848484] border">
            <Link href="/">
                <h1 className="text-[40px] font-bold">StartHub</h1>
            </Link>
        </div>
     );
}
 
export default Header;