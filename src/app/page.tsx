import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <div className="header">
          <Image src="/next.svg" alt="" width={72} height={32} />
          <p>Korean Helper</p>
        </div>
        {/* <Chat /> */}
      </div>
    </main>
  );
}
