"use client"

import Image from "next/image";
import { Chat } from "./_components/Chat";
import { Header } from "./_components/Header";
import { Recorder } from "./_components/Recorder";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12">
      <div className="container">
        <Header />
        <Recorder />
        <Chat />
      </div>
    </main>
  );
}
