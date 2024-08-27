import Link from "next/link";

export default function Header() {
    return (
        <header className="flex justify-between items-center w-full">
            <Link href={"/"} className="text-2xl font-bold">App</Link>
            <Link href={"/users"}>Add a New Users</Link>
        </header>
    )
}