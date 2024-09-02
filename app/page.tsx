import Link from "next/link";

export default function Home(){
    return <div className="flex flex-col gap-y-5">
        <Link href="/board">여기를 눌러 board 탭으로 이동하세요!</Link>
        <Link href="/login">로그인</Link>
        <Link href="/register">회원가입</Link>
    </div>
}