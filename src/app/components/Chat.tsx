'use client'

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Message, useChat } from "ai/react"; // Assurez-vous que ce type existe

export const Chat = () => {
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/openai",
    });
    const chatContainer = useRef<HTMLDivElement>(null);

    const scroll = () => {
        const { offsetHeight, scrollHeight, scrollTop } =
            chatContainer.current as HTMLDivElement;
        if (scrollHeight >= scrollTop + offsetHeight) {
            chatContainer.current?.scrollTo(0, scrollHeight + 200);
        }
    };

    useEffect(() => {
        scroll();
    }, [messages]);

    const renderResponse = () => {
        return (
            <div className="h-48">
                {messages.map((message, index) => (
                    <div
                        key={message.id}
                        className={`chat-line ${
                            message.role === "user" ? "user-chat" : "ai-chat"
                        }`}
                    >
                        <Image
                            className="avatar"
                            alt="avatar"
                            src={
                                message.role === "user"
                                    ? "/vercel.svg"
                                    : "/next.svg"
                            }
                            width={72}
                            height={72}
                        />
                        <div style={{ width: "100%", marginLeft: "16px" }}>
                            <p className="message">{message.content}</p>
                            {index < messages.length - 1 && (
                                <div className="horizontal-line" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div ref={chatContainer} className="chat">
            {renderResponse()}
            <form onSubmit={handleSubmit} className="mainForm">
                <input
                    name="input-field"
                    type="text"
                    placeholder="Say something in Korean..."
                    onChange={handleInputChange}
                    value={input}
                />
                <button type="submit" className="mainButton"></button>
            </form>
        </div>
    );
};
