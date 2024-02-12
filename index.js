import { getLlmResponse } from "./src/llm/gpt4allModel.js";
import { sendTts } from "./src/textToSpeech/mixItUp.js";

console.log("Welcome to the control program for Midnight Melody!");
console.log("Check back later on as features are added.");

const ttsResponse = await getLlmResponse();

await sendTts(ttsResponse);