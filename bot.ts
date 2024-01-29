import { App } from "@slack/bolt";
import dotenv from "dotenv";

dotenv.config();
//creating an instance of the app
const app: App = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

interface Element {
  type: string;
  [key: string]: any;
}

interface Block {
  type: string;
  elements?: Element[];
  text?: {
    type: string;
    text: string;
  };
  [key: string]: any;
}

const test: string = "test before push";


const blocks: Block[] = [
  {
    type: "rich_text",
    elements: [
      {
        type: "rich_text_section",
        elements: [
          {
            type: "emoji",
            name: "palm_tree",
            unicode: "1f334",
          },
          {
            type: "text",
            text: "  Hello this is a " + test,
          },
        ],
      },
    ],
  },
];

//function to post message to slack
async function postMessage() {
  await app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: process.env.SLACK_CHANNEL as string,
    text: "Hi, I am a Vacation Bot!",
    blocks,
  });
}

// Calling the function and posting the message
postMessage();
