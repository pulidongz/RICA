import { app, MACHINE_ARR } from "../..";

export function CustomMsgs(){

    // Answers to 'hello' messages
    app.message(/^(hi|hello|hey|oist|oi).*/, async ({ message, say }) => {
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
                    "type": "section",
                    "fields": [
                        {
                            "type": "plain_text",
                            "text": ":white_check_mark: help\n- Displays this message",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": ":white_check_mark: check-script [host_id]\n- Checks if script(s) are running on the specified host",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": ":white_check_mark: reboot [host_id]\n- Reboots the specified host",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": ":white_check_mark: kill-script [host_id] [script]\n- Kills the specified script on the specified host",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": ":white_check_mark: start-script [host_id] [script]\n- Starts the specified script on the specified host",
                            "emoji": true
                        },
                        {
                            "type": "plain_text",
                            "text": ":white_check_mark: run-init\n- Runs the init script on all hosts",
                            "emoji": true
                        }
                    ]
                }
            ],
            text: "fallback text message"
        });
    });

    // Answers to 'credential' inquiries
    app.message(/^(creds|config).*/, async ({ message, say }) => {
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

    // Answers to 'ticket' inquiries
    app.message(/^(ticks|ticket).*/, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "Link for <https://trello.com/b/OWVJeuBw/01-development-tickets-current|Trello Development Tickets>",
                    }
                }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });
}