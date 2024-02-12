import { promises as fs } from "fs";
import { createCompletion, loadModel } from "gpt4all";
import { sendTts } from "./src/textToSpeech/mixItUp.js";

console.log("Welcome to the control program for Midnight Melody!");
console.log("Check back later on as features are added.");

const model = await loadModel("gpt4all-falcon-newbpe-q4_0.gguf");

const systemPromptUrl = new URL("./config/MidnightMelodySystemPrompt.txt", import.meta.url);
const systemPrompt = await fs.readFile(systemPromptUrl);

const response = await createCompletion(
    model,
    [
        { role : 'system', content: systemPrompt },
        { role : 'user', content: "What is the meaning of life?" },
    ],
    {
        systemPromptTemplate: "%1",
        promptTemplate: "### Instruction:\n%1\n### Response:\n"
    }
);

const ttsResponse = response.choices[0].message.content;

await sendTts(ttsResponse);