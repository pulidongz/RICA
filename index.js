const { App } = require('@slack/bolt');
import { NodeSSH } from 'node-ssh';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config({path: '.env'});

export const MACHINE_ARR = ["64", "91", "92", "93", "94", "110", "111", "112", "253"]
// export const MACHINE_ARR = ["64", "94", "253"]
export const ssh = new NodeSSH();


import { CustomMsgs } from './src/slack_apis/BotCustomMsgs';
import { BotScripts } from './src/slack_apis/BotScripts';

// Initializes your app with your bot token and signing secret
export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 5000,
});

CustomMsgs();
BotScripts();

(async () => {
  // Start your app
  await app.start();

  console.log(`${process.env.BOT_NAME} is running on port ${process.env.PORT}`);
})();