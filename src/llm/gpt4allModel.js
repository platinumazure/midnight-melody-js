import { promises as fs } from "fs";
import { createCompletion, loadModel } from "gpt4all";

const systemPromptUrl = new URL("../../config/MidnightMelodySystemPrompt.txt", import.meta.url);
const systemPrompt = await fs.readFile(systemPromptUrl);

const model = await loadModel(
    "gpt4all-falcon-newbpe-q4_0.gguf",
    {
        verbose: false,
        nBatch: 128,
        nCtx: 2048,

        // Use a short nPredict for brief responses
        nPredict: 64,
    }
);

export class Gpt4allModel {
    constructor() {
        this._messages = getInitialMessages();
    }

    async getResponse(userMessage) {
        this._messages.push({
            role: "user",
            content: userMessage,
        });

        const response = await createCompletion(
            model,
            this._messages,
            {
                systemPromptTemplate: "%1",
                promptTemplate: "### Instruction:\n%1\n### Response:\n"
            }
        );

        this._messages.push(response);
    
        const responseContent = response.choices[0].message.content;
        return responseContent;
    }

    get lastResponse() {
        return this._messages
            .findLast(m => m.role === "assistant")
            ?.content;
    }

    get lastPrompt() {
        return this._messages
            .findLast(m => m.role === "user")
            ?.content;
    }
}

function getInitialMessages() {
    return [
        { role: 'system', content: systemPrompt },
    ];
}