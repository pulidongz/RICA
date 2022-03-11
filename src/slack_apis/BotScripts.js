import { app, } from "../..";
import { MACHINE_ARR } from "../../instance/config";
import { 
    checkIfValidMachine, 
    checkRunningScripts,
    checkIfValidScript,
    rebootMachine,
    killScript,
    startScript, 
} from "../utils/ShellCommands";


export function BotScripts() {
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