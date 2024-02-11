import { Client } from "node-rest-client";
import config from "./config.json" assert { type: "json" };

console.log("Welcome to the control program for Midnight Melody!");
console.log("Check back later on as features are added.");

const mixItUpUrl = `https://api.mixitupapp.com/api/webhook/${config.mixItUp.webhookId}?secret=${config.mixItUp.secret}`;

const client = new Client();

client.post(
    mixItUpUrl,
    {
        data: {
            message: "Here is a message"
        },
        headers: {
            "Content-Type": "application/json"
        }
    },
    (data, response) => {
        console.log(`Status code: ${response.statusCode}`);
        console.log(`Status code: ${response.statusMessage}`);
        console.log(`Response body: ${data.toString("utf8")}`);
    }
);