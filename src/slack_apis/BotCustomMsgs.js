import { app } from "../..";

export function CustomMsgs(){

    // Answers to 'hello' messages
    app.message(/^(hi|hello|hey|oist|oi|ei).*/i, async ({ message, say }) => {
        await say({
            blocks: [
            {
                "type": "section",
                "text": {
                "type": "mrkdwn",
                "text": `Hey there <@${message.user}>! :wave: How may I help you?`
                },
            }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });

    // Answers to 'hello' messages
    app.message(/^(thanks|ty|thank you).*/i, async ({ message, say }) => {
        await say({
            blocks: [
            {
                "type": "section",
                "text": {
                "type": "mrkdwn",
                "text": `You're welcome <@${message.user}>! :+1: Glad I could be of assistance!`
                },
            }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });

    // Answers to 'hello' messages
    app.message(/^(help|tulong|how|elp|info).*/i, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Bot Commands",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": ":small_orange_diamond: *help | tulong | how | elp | info*\n-Displays help message",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_orange_diamond: *machine-creds [host_id]*\n-Displays credentials of the specified host",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_orange_diamond: *remote-creds*\n-Displays AnyDesk / Teamviewer credentials of the specified host",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_orange_diamond: *ping [host_id]*\n-Check network statistics and latency of the specified host",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_orange_diamond: *check-script [host_id]*\n-Checks if script(s) are running on the specified host",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_orange_diamond: *reboot [host_id]*\n-Reboots the specified host",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_orange_diamond: *kill-script [host_id] [script]*\n-Kills the specified script on the specified host",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_orange_diamond: *start-script [host_id] [script]*\n-Starts/restarts the specified script on the specified host",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_orange_diamond: *run-init*\n-Runs the init script on all hosts",
                        },
                    ]
                },
                {
                    "type": "header",
                    "text": {
                        "type": "plain_text",
                        "text": "Link Requests",
                        "emoji": true
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": ":small_blue_diamond: *gdrive-si* \n<https://drive.google.com/drive/folders/1hmMn45vOhGkaA_2xQ38_75b5NinIcV8v|SI - Google Drive>",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_blue_diamond: *trello-creds* \n<https://trello.com/c/QYVi1EmO/100-updated-server-credentials-september-2022|Trello: Machine Credentials>",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_blue_diamond: *trello-dev* \n<https://trello.com/b/OWVJeuBw/01-development-tickets-current|Trello Development Tickets>",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_blue_diamond: *trello-docu* \n<https://trello.com/b/Mvx7eGvP/02-documentation|Trello Documentation>",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_blue_diamond: *trello-mo* \n<https://trello.com/b/PeWcVmy7/00-monitoring-operations-2022|Trello Monitoring Operations 2022>",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_blue_diamond: *trello-cbewsl* \n<https://trello.com/b/6S4vV0in/01-cbewsl|Trello CBEWSL 2022>",
                        },
                        {
                            "type": "mrkdwn",
                            "text": ":small_blue_diamond: *trello-main* \n<https://trello.com/b/KRfbDHyr/00-main-2022|Trello Main 2022>",
                        },
                    ]
                },
            ],
            text: "fallback text message"
        });
    });

    // Answers to SI Google Drive inquiry
    app.message(/^(gdrive-si).*/i, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Link to <https://drive.google.com/drive/folders/1hmMn45vOhGkaA_2xQ38_75b5NinIcV8v|SI - Google Drive>",
                    }
                }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });

    // Answers to 'credential' inquiry
    app.message(/^(trello-creds).*/i, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Rack Server (Main)*\nIP: 192.168.150.50 \nuser: softwareinfra \npass: dyn4sl0p32020"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "for more information, please visit: <https://trello.com/c/QYVi1EmO/100-updated-server-credentials-september-2022|Trello>",
                    }
                }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });

    // Answers to Trello SI Dev 'tickets' inquiry
    app.message(/^(trello-dev).*/i, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Link to <https://trello.com/b/OWVJeuBw/01-development-tickets-current|Trello Development Tickets>",
                    }
                }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });

    // Answers to Trello SI 'documentation' inquiry
    app.message(/^(trello-docu).*/i, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Link to <https://trello.com/b/Mvx7eGvP/02-documentation|Trello Documentation>",
                    }
                }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });

    // Answers to Trello 'monitoring operations' inquiry
    app.message(/^(trello-mo).*/i, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Link to <https://trello.com/b/PeWcVmy7/00-monitoring-operations-2022|Trello Monitoring Operations 2022>",
                    }
                }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });

    // Answers to Trello CBEWSL inquiry
    app.message(/^(trello-cbewsl).*/i, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Link to <https://trello.com/b/6S4vV0in/01-cbewsl|Trello CBEWSL 2022>",
                    }
                }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });

    // Answers to Trello Main inquiry
    app.message(/^(trello-main).*/i, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Link to <https://trello.com/b/KRfbDHyr/00-main-2022|Trello Main 2022>",
                    }
                }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });
}