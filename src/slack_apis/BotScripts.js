import { app, } from "../..";
import { MACHINE_ARR } from "../../instance/config";
import { 
    getCredentials,
    checkIfValidMachine, 
    checkRunningScripts,
    checkIfValidScript,
    rebootMachine,
    killScript,
    startScript, 
} from "../utils/ShellCommands";


export function BotScripts() {
    app.message(/^(remote-creds).*/, async ({ message, say }) => {
        await say({
            "blocks": [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*TeamViewer*\n1225737909 - Monitoring PC \n543148747 - Meryll PC \n522698723 - Brain PC \n1790639411 - Gene PC \n1575800062 - Chad \n pass: senslope"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*Anydesk*\n858418785 - Monitoring PC \n697682235 - Brain PC \n163339330 - Gene PC \n594080318 - Chad PC \ndyna-meryll@ad - Meryll PC \npass: s3nslope"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "\n634703210 - Dyna Server \npass: dyn4sl0p32020 \n877283734 - Kevin PC \npass: softwareinfra"
                    }
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "for more information, please visit: <https://trello.com/c/WeqRFkwK/15-teamviewer-accounts-for-monitoring|Trello>",
                    }
                }
            ],
            text: `Hey there <@${message.user}>! :wave:`
        });
    });

    /*
     * Displays machine credentials
     */
    app.message(/^(machine-creds).*/, async ({ message, say }) => {
        let machine = message.text.trim().split(" ")[1];
        let isValid = checkIfValidMachine(machine);

        if(!isValid.status){
            await say({
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `${isValid.data} :dizzy_face:`
                        }
                    },
                ],
                text: "fallback text message"
            });
        } else {
            try {
                if(machine === "all"){
                    for(const m of Object.keys(MACHINE_ARR)){   
                        const { hostname, ip, user, pass } = getCredentials(m);
                        await say(`*${hostname}*\nIP: ${ip}\nUser: ${user}\nPass: ${pass}`);
                    }
                } else {
                    const { hostname, ip, user, pass } = getCredentials(machine);
                    await say(`*${hostname}*\nIP: ${ip}\nUser: ${user}\nPass: ${pass}`);
                }
            } catch (error) {
                console.log(error);
                await say({
                    "blocks": [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `${error}`
                            }
                        },
                    ],
                    text: "fallback text message"
                });
            }
        }
    });

    /*
     * Checks if script(s) are running on the machine
     */
    app.message(/^(check-script).*/, async ({ message, say }) => {
        let machine = message.text.trim().split(" ")[1];
        let isValid = checkIfValidMachine(machine);

        if(!isValid.status){
            await say({
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `${isValid.data} :dizzy_face:`
                        }
                    },
                ],
                text: "fallback text message"
            });
        } else {
            try {
                if(machine === "all"){
                    for(const m of Object.keys(MACHINE_ARR)){   
                        const result = await checkRunningScripts(m);
                        await say(result);
                    }
                } else {
                    const result = await checkRunningScripts(machine);
                    await say(result);
                }
            } catch (error) {
                console.log(error);
                await say({
                    "blocks": [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `${error}`
                            }
                        },
                    ],
                    text: "fallback text message"
                });
            }
        }
    });

    /*
     * Reboot specified machine(s)
     */
    app.message(/^(reboot).*/, async ({ message, say }) => {
        let machine = message.text.trim().split(" ")[1];
        let isValid = checkIfValidMachine(machine);
        // let isValid = rebootMachine(machine);

        if(!isValid.status){
            await say({
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `${isValid.data} :dizzy_face:`
                        }
                    },
                ],
                text: "fallback text message"
            });
        } else {
            try {
                if(machine === "all"){
                    for(const m of MACHINE_ARR){
                        const result = await rebootMachine(m);
                        await say(result);
                    }
                } else {
                    const result = await rebootMachine(machine);
                    await say(result);
                }
            } catch (error) {
                console.log(error);
                await say({
                    "blocks": [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `${error}`
                            }
                        },
                    ],
                    text: "fallback text message"
                });
            }
        }
    });

    /*
     * Terminate specified script runnning on current machine
     */
    app.message(/^(kill-script).*/, async ({ message, say }) => {
        let [command, machine, script]= message.text.trim().split(" ");

        console.log(command, machine, script);

        let isValid = checkIfValidMachine(machine);

        if(!isValid.status){
            await say({
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `${isValid.data} :dizzy_face:`
                        }
                    },
                ],
                text: "fallback text message"
            });
        } else {
            try {
                const result = await killScript(machine, script);
                console.log('RESULT: ', result);
                await say(result);
                
            } catch (error) {
                console.log(error);
                await say({
                    "blocks": [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `${error}`
                            }
                        },
                    ],
                    text: "fallback text message"
                });
            }
        }
    });

    /*
     * Starts specified script on specified machine
     */
    app.message(/^(start-script).*/, async ({ message, say }) => {
        let [command, machine, script]= message.text.trim().split(" ");

        console.log(command, machine, script);

        let isValid = checkIfValidMachine(machine) && checkIfValidScript(machine, script);

        if(!isValid.status){
            await say({
                "blocks": [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": `${isValid.data} :dizzy_face:`
                        }
                    },
                ],
                text: "fallback text message"
            });
        } else {
            try {
                const result = await startScript(machine, script);
                console.log(result);
                await say(result);
                
            } catch (error) {
                console.log(error);
                await say({
                    "blocks": [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": `${error}`
                            }
                        },
                    ],
                    text: "fallback text message"
                });
            }
        }
    });
}