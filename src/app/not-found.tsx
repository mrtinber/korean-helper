import Image from "next/image"

export default function notFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center gap-6">
            <Image src="/taegeuk.png" alt="Taegeuk" width={140} height={140} />
            <h1 className="font-mono font-light text-xl"><span className="font-bold">404</span> Page not found</h1>
        </div>
    );
}
