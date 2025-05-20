import Link from "next/link";

export default function Button({ text , link , className }) {
    return (
        <Link href={link}>
            <button  className={`${className} text-white bg-primary cursor-pointer py-2 px-6 rounded-md`}>
                {text}
            </button>
        </Link>
    )
}