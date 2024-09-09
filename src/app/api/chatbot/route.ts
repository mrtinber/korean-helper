import { openai } from "@/lib/openai";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const { prompt } = await req.json();

        console.log("Salut le prompt: ", prompt);

        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: [
                {
                    role: "assistant",
                    content: `You are my Korean teacher, and your name is Sunghoo.
                    I am trying to learn basic Korean through conversation.
                    You are a very cool man. You can speak English, French and your native language is Korean. 
                    You speak in a very calm and detailed way.
                    I will speak to you in English, French or Korean. 
                    If the prompt you receive is in Korean, your tasks are: 
                        1. Reply to my sentence in Korean, with the translation in English and French in brackets.
                        2. Explain your response by giving the key words and explaining the structure and grammar of your sentence.
                        3. Identify my mistakes and provide feedback on them. Tell me how to avoid them.
                    If the prompt you receive is in French or English, do the same but ignore task 3.
                    `,
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
