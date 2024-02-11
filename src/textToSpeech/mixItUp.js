import { Client } from "node-rest-client";
import config from "../../config.json" assert { type: "json" };

const client = new Client();

const mixItUpUrl = `https://api.mixitupapp.com/api/webhook/${config.mixItUp.webhookId}?secret=${config.mixItUp.secret}`;

export async function sendTts(message) {
    return new Promise((resolve, reject) => {
        client.post(
            mixItUpUrl,
            {
                data: {
                    message,
                },
                headers: {
                    "Content-Type": "application/json"
                }
            },
            (data, response) => {
                if (response.statusCode >= 400) {
                    const reason =
                        `TTS failed with status code ${response.statusCode}. Response body: ${data}`;
                    reject(reason);
                } else {
                    resolve();
                }
            }
        );
    });
}