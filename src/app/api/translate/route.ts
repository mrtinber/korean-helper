import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    const { language, text } = await req.json()
    console.log("Clé API (route.ts) :", process.env.OPENAI_API_KEY);
    
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content:
                    `You will be provided with a sentence. Your tasks are to : 
                    - Detect the language of the sentence
                    - Translate it into ${language}
                    Do not return anything but the translated sentence.
                    `,
            },
            {
                role: "user",
                content: text,
            },
        ],
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
    });

    return NextResponse.json({
        text: response.choices[0].message.content
    });
}
