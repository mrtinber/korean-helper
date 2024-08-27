import OpenAi, { OpenAI } from "openai";
import { OpenAIStream, StreamingTextResponse, streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

// Create an OpenAI API client
const openai = new OpenAI({
    apiKey: "",
});

// Set to edge so it's faster
export const runtime = "edge";

export async function POST(req: Request, res: Response) {
    // Extract the prompt from the body of the request
    const { messages } = await req.json();
    console.log("Messages: ", messages);

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: "gpt-4-1106-preview",
        messages: [
            {
                role: "system",
                content:
                    "You are a young Korean Language Teacher. You are very cool and you can also speak English and French. You will adress your students in these three languages. They will try to interact with you in Korean and you have to correct their mistakes and explain why it is wrong. You will also provide detailed explanations and more examples so the students can improve.",
            },
            ...messages,
        ],
        // So the messages appears one character at a time
        stream: true,
        // Creates some variability in the answer?
        temperature: 1,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response); 
    // const stream = createOpenAI(response); 

    // Respond with the stream 
    return new StreamingTextResponse(stream);
    // return streamText.toDataStreamResponse(stream);
}
