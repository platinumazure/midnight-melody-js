import { Gpt4allModel } from "./src/llm/gpt4allModel.js";
import { sendTts } from "./src/textToSpeech/mixItUp.js";

console.log("Welcome to the control program for Midnight Melody!");
console.log("Check back later on as features are added.");

const model = new Gpt4allModel();

const userPrompts = [
    "What is the meaning of life?",
    "Can you explain this in terms a 5 year old can understand?",
];

for (const [index, message] of userPrompts.entries()) {
    console.log(`Sending user message: "${message}"`);

    console.time(`Message ${index + 1}`);

    const responseContent = await model.getResponse(message);

    console.timeEnd(`Message ${index + 1}`);
    console.log(`Received model response: "${responseContent}"`);

    await sendTts(responseContent);
}