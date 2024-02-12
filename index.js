import { Gpt4allModel } from "./src/llm/gpt4allModel.js";
import { sendTts } from "./src/textToSpeech/mixItUp.js";

console.log("Welcome to the control program for Midnight Melody!");
console.log("Check back later on as features are added.");

const model = new Gpt4allModel();

const userPrompts = [
    "What is the meaning of life?",
];

for (const message of userPrompts) {
    console.log(`Sending user message: "${message}"`);

    const responseContent = await model.getResponse(message);
    console.log(`Received model response: "${responseContent}"`);

    await sendTts(responseContent);
}