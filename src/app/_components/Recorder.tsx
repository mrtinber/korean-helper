"use client";

import { useEffect, useState } from "react";

export const Recorder = () => {
    const [isActive, setIsActive] = useState<boolean>();
    const [text, setText] = useState<string>();
    const [translation, setTranslation] = useState<string>();
    const [voices, setVoices] = useState<Array<SpeechSynthesisVoice>>();

    const language = 'ko-KR'
    console.log("Clé API :", process.env.OPENAI_API_KEY);

    // console.log(voices)
    const availableVoices = voices?.filter(({lang}) => lang === language)
    // console.log(availableVoices)

    const activeVoice = availableVoices?.find(({name}) => name.includes('Google')) || availableVoices?.[0];

    useEffect(() => {
        const voices = window.speechSynthesis.getVoices();
        if (Array.isArray(voices) && voices.length > 0) {
            setVoices(voices);
            return;
        }
        if ("onvoiceschanged" in window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = function () {
                const voices = window.speechSynthesis.getVoices();
                setVoices(voices);
            };
        }

    }, []);
    
    const handleRecord = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.onresult = async function (event) {
            const transcript = event.results[0][0].transcript;
            console.log("La transcription: ", transcript);
            setText(transcript);
            const response = await fetch('api/translate', {
                method: 'POST',
                body: JSON.stringify({
                    text: transcript,
                    language: 'ko-KR'
                })
            }).then(r => r.json())
            setTranslation(response.text)
            if (!activeVoice) return;

            let utterance = new SpeechSynthesisUtterance(response.text);

            utterance.voice = activeVoice;  // Set the selected voice

            window.speechSynthesis.speak(utterance);
        };

        recognition.start();
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p>Input: {text}</p>
            <p>Translation: {translation}</p>
            <button
                onClick={handleRecord}
                className="text-white bg-[#0245A2] disabled:bg-gray-500 hover:bg-[#CC2E38] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-all"
            >
                {isActive ? "Stop" : "Record"}
            </button>
        </div>
    );
};
