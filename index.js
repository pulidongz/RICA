import { NodeSSH } from 'node-ssh';
import { CustomMsgs } from './src/slack_apis/BotCustomMsgs';
import { BotScripts } from './src/slack_apis/BotScripts';
import { Network } from './src/slack_apis/BotNetwork';
import { Memcache } from './src/slack_apis/BotMemcache';
import { HWInfo } from './src/slack_apis/BotHWinfo';

import dotenv from 'dotenv';

dotenv.config({path: '.env'});

const { App } = require('@slack/bolt');

// Initialize app with bot token and signin secret
export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 5000,
});

export const ssh = new NodeSSH();

CustomMsgs();
BotScripts();
Network();
Memcache();
HWInfo();

(async () => {
  // Start APP
  await app.start();

  console.log(`${process.env.BOT_NAME} is running on port ${process.env.PORT}`);
})();