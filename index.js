import { sendTts } from "./src/textToSpeech/mixItUp.js";

console.log("Welcome to the control program for Midnight Melody!");
console.log("Check back later on as features are added.");

// Send prompt to LLM, and get response

await sendTts("Here is a message");