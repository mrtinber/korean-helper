"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Message, useChat } from "ai/react"; // Assurez-vous que ce type existe

export const Chat = () => {
    const [msgInKorean, setMsgInKorean] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const prompt = formData.get("prompt") as string;

        console.log("Montre le prompt stp: ", prompt);

        const result = await fetch("/api/chatbot", {
            method: "POST",
            body: JSON.stringify({ prompt }),
        });

        console.log("Result:", result);

        const json = await result.json();

        console.log(json);

        setMsgInKorean(json.code);
    };

    return (
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
            <pre>{msgInKorean}</pre>

            <form
                id="generate-form"
                className="w-full bg-gray-300 p-4 shadow-md flex justify-center"
                onSubmit={handleSubmit}
            >
                <ul
                    id="messages"
                    className="flex flex-col gap-1 text-xs max-h-[150px] overflow-auto"
                ></ul>
                <fieldset className="flex items-center max-w-md w-full gap-2">
                    <input
                        type="text"
                        id="prompt"
                        name="prompt"
                        className="bg-gray-50 border border-gray-300 disabled:bg-gray-500 disabled:cursor-not-allowed text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Say something to our assistant..."
                        required
                    ></input>
                    <button
                        type="submit"
                        className="text-white bg-[#0245A2] disabled:bg-gray-500 hover:bg-[#CC2E38] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
                    >
                        Send
                    </button>
                </fieldset>
            </form>
        </div>
    );
};

// export const Chat = () => {
//     const { messages, input, handleInputChange, handleSubmit } = useChat();
//     const chatContainer = useRef<HTMLDivElement>(null);

//     const scroll = () => {
//         const { offsetHeight, scrollHeight, scrollTop } =
//             chatContainer.current as HTMLDivElement;
//         if (scrollHeight >= scrollTop + offsetHeight) {
//             chatContainer.current?.scrollTo(0, scrollHeight + 200);
//         }
//     };

//     useEffect(() => {
//         scroll();
//     }, [messages]);

//     const renderResponse = () => {
//         return (
//             <div classNameName="h-48">
//                 {messages.map((message, index) => (
// <div
//     key={message.id}
//     classNameName={`chat-line ${
//         message.role === "user" ? "user-chat" : "ai-chat"
//     }`}
// >
//     <Image
//         classNameName="avatar"
//         alt="avatar"
//         src={
//             message.role === "user"
//                 ? "/vercel.svg"
//                 : "/next.svg"
//         }
//         width={72}
//         height={72}
//     />
//     <div style={{ width: "100%", marginLeft: "16px" }}>
//         <p classNameName="message">{message.content}</p>
//         {index < messages.length - 1 && (
//             <div classNameName="horizontal-line" />
//         )}
//     </div>
// </div>
//                 ))}
//             </div>
//         );
//     };

//     return (
//         <div ref={chatContainer} classNameName="chat">
//             {renderResponse()}
//             <form onSubmit={handleSubmit} classNameName="mainForm">
//                 <input
//                     name="input-field"
//                     type="text"
//                     placeholder="Say something in Korean..."
//                     onChange={handleInputChange}
//                     value={input}
//                 />
//                 <button type="submit" classNameName="mainButton w-4 bg-black h-4 rounded-full"></button>
//             </form>
//         </div>
//     );
// };

// export function Chat() {
//     const { messages, handleSubmit, input, handleInputChange } = useChat();
//     const formRef = useRef<HTMLFormElement>(null);

//     return (
//         <main classNameName="">
//             <div classNameName="container">
//                 <div classNameName="">
//                     {messages.map((message, index) => (
//                         <div
//                             key={message.id}
//                             classNameName={`chat-line ${
//                                 message.role === "user"
//                                     ? "user-chat"
//                                     : "ai-chat"
//                             }`}
//                         >
//                             <Image
//                                 classNameName="avatar"
//                                 alt="avatar"
//                                 src={
//                                     message.role === "user"
//                                         ? "/vercel.svg"
//                                         : "/next.svg"
//                                 }
//                                 width={72}
//                                 height={72}
//                             />
//                             <div style={{ width: "100%", marginLeft: "16px" }}>
//                                 <p classNameName="message">{message.content}</p>
//                                 {index < messages.length - 1 && (
//                                     <div classNameName="horizontal-line" />
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <form
//                     ref={formRef}
//                     onSubmit={handleSubmit}
//                     classNameName=""
//                 >
//                     <input
//                         classNameName="w-full text-lg"
//                         placeholder="Say something"
//                         value={input}
//                         onChange={handleInputChange}
//                     />
//                     <button
//                         type="submit"
//                         disabled={!input}
//                         classNameName="absolute top-1/2 transform -translate-y-1/2 right-4 rounded-full"
//                     ></button>
//                 </form>
//             </div>
//         </main>
//     );
// }
