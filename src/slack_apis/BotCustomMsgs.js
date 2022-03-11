import { app, MACHINE_ARR } from "../..";

export function CustomMsgs(){

    // Answers to 'hello' messages
    app.message(/^(hi|hello|hey|oist|oi|ei).*/, async ({ message, say }) => {
        await say({
            blocks: [
            {
                "type": "section",
                "text": {
                "type": "mrkdwn",
                "text": `Hey there <@${message.user}>! :wave:`
                },
            }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });

    // Answers to 'hello' messages
    app.message(/^(help|tulong|how|elp).*/, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Essential Bot Commands:*"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "plain_text",
                            "text": ":black_small_square: help\n- Displays this message",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": ":black_small_square: check-script [host_id]\n- Checks if script(s) are running on the specified host",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": ":black_small_square: reboot [host_id]\n- Reboots the specified host",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": ":black_small_square: kill-script [host_id] [script]\n- Kills the specified script on the specified host",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": ":black_small_square: start-script [host_id] [script]\n- Starts the specified script on the specified host",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": ":black_small_square: run-init\n- Runs the init script on all hosts",
                            "emoji": true
                        },
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "\n*Link Requests:*"
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":small_blue_diamond: gdrive-si \n<https://drive.google.com/drive/folders/1hmMn45vOhGkaA_2xQ38_75b5NinIcV8v|SI - Google Drive>",
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":small_blue_diamond: trello-creds \n<https://trello.com/c/QYVi1EmO/100-updated-server-credentials-september-2022|Trello: Machine Credentials>",
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":small_blue_diamond: trello-dev \n<https://trello.com/b/OWVJeuBw/01-development-tickets-current|Trello Development Tickets>",
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":small_blue_diamond: trello-docu \n<https://trello.com/b/Mvx7eGvP/02-documentation|Trello Documentation>",
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": ":small_blue_diamond: trello-mo \n<https://trello.com/b/PeWcVmy7/00-monitoring-operations-2022|Trello Monitoring Operations 2022>",
                    }
                },
            ],
            text: "fallback text message"
        });
    });

    // Answers to SI Google Drive inquiries
    app.message(/^(gdrive-si).*/, async ({ message, say }) => {
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

    // Answers to 'credential' inquiries
    app.message(/^(trello-creds).*/, async ({ message, say }) => {
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

    // Answers to Trello SI Dev 'tickets' inquiries
    app.message(/^(trello-dev).*/, async ({ message, say }) => {
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

    // Answers to Trello SI 'documentation' inquiries
    app.message(/^(trello-docu).*/, async ({ message, say }) => {
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

    // Answers to Trello 'monitoring operations' inquiries
    app.message(/^(trello-mo).*/, async ({ message, say }) => {
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
}