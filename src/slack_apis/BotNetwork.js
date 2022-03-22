import { app } from "../..";
import { MACHINE_ARR } from "../../instance/config";
import { 
    checkIfValidMachine, 
    checkNetwork, 
} from "../utils/ShellCommands";

export function Network() {
    /*
     * Check network statistics and latency of the specified host
     */
    app.message(/^(ping).*/i, async ({ message, say }) => {
        let [command, machine]= message.text.toLowerCase().trim().split(" ");

        console.log(command, machine);

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
                        const result = await checkNetwork(m);
                        await say(result);
                    }
                } else {
                    const result = await checkNetwork(machine);
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
}