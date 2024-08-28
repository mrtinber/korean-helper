import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { prompt } = await req.json();

        console.log("Salut le prompt: ", prompt);

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "assistant",
                    content: "Translate the message in Korean.",
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        return NextResponse.json({ code: response.choices[0].message.content });
    } catch (error) {
        console.error("Error trying to call OpenAI.", error);
    }
};
