import { MACHINE_ARR } from "../../";
import child_process from 'child_process';
import { NodeSSH } from "node-ssh";
import moment from 'moment';

const ssh = new NodeSSH();


export function execShellCommand(cmd){
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } else {
                resolve(stdout);
            }
        });
    });
}

export function checkIfValidMachine(machine){
    if(machine !== "all" && !MACHINE_ARR.includes(machine))
        return ({
            status: false, data: `Machine ${machine} does not exist`
        });
    return ({
        status: true, data: `Machine ${machine} exists`
    });
}

export function getCredentials(machine){
    switch(machine){
        case "64":
            return {
                hostname: "COARE Instance",
                ip: process.env.COARE_INSTANCE_IP,
                user: process.env.COARE_INSTANCE_USER,
                pass: process.env.COARE_INSTANCE_PASS
            };
        case "91":
            return {
                hostname: "Globe GSM Logger",
                ip: process.env.GLOBE_GSM_LOGGER_IP,
                user: process.env.GLOBE_GSM_LOGGER_USER,
                pass: process.env.GLOBE_GSM_LOGGER_PASS
            };
        case "92":
            return {
                hostname: "Smart GSM Logger",
                ip: process.env.SMART_GSM_LOGGER_IP,
                user: process.env.SMART_GSM_LOGGER_USER,
                pass: process.env.SMART_GSM_LOGGER_PASS
            };
        case "93":
            return {
                hostname: "Comms GSM",
                ip: process.env.COMMS_GSM_IP,
                user: process.env.COMMS_GSM_USER,
                pass: process.env.COMMS_GSM_PASS
            };
        case "110":
            return {
                hostname: "MIA",
                ip: process.env.MIA_IP,
                user: process.env.MIA_USER,
                pass: process.env.MIA_PASS
            };
        case "111":
            return {
                hostname: "Analysis",
                ip: process.env.ANALYSIS_IP,
                user: process.env.ANALYSIS_USER,
                pass: process.env.ANALYSIS_PASS
            };
        case "112":
            return {
                hostname: "DB",
                ip: process.env.DB_IP,
                user: process.env.DB_USER,
                pass: process.env.DB_PASS
            };
        case "253":
            return {
                hostname: "Sandbox Server",
                ip: process.env.SANDBOX_IP,
                user: process.env.SANDBOX_USER,
                pass: process.env.SANDBOX_PASS
            };
        case "94":
            return {
                hostname: "Watchdog",
                ip: process.env.WATCHDOG_IP,
                user: process.env.WATCHDOG_USER,
                pass: process.env.WATCHDOG_PASS
            };
    }
}

export async function checkRunningScripts(machine){
    const { hostname, ip, user, pass } = getCredentials(machine);
    let response = "";

    console.log(`Checking script on ${hostname}`);

    // SSH to machine
    await ssh
    .connect({
        host: ip,
        username: user,
        password: pass
    })
    .then(async() => {
        console.log(`Connected to ${hostname}!`);

        await ssh.execCommand(`screen -ls`)
        .then((result) => {
            if(result.stdout.includes("No Sockets found")){
                response = `*${hostname}*\n No scripts currently running.`;
            } else {
                response = `*${hostname}*:\n As of ${moment().format('LLLL')}, \n${result.stdout}`;
            }
            console.log(response);
        })
        .finally(() => {
            console.log("Disconnected \n");
            ssh.dispose();
        });
    })
    
    return response;
}

export async function rebootMachine(machine){
    const { hostname, ip, user, pass } = getCredentials(machine);
    let ts = moment();
    let response = "";

    // Initial SSH to `reboot` machine
    await ssh
    .connect({
        host: ip,
        username: user,
        password: pass
    })
    .then(async() => {
        console.log(`Connected to ${hostname}!`);

        await ssh.execCommand(`sudo reboot`)
        .then(() => {
            console.log("Disconnected \n");
            ssh.dispose();
        });
    })

    // todo: check if reboot was successful using ping, then ssh to machine to confirm if it's up
    // Second SSH to check if machine is online
    // await ssh
    // .connect({
    //     host: ip,
    //     username: user,
    //     password: pass
    // })
    // .then(() => {
    //     console.log("Disconnected \n");
    //     ssh.dispose();
    //     ts = moment() - ts;
    //     response = 
    //     `${hostname} rebooted in ${ts}
    //     Status: Active`;
    // });
    
    response = `${hostname} rebooted successfully!`;

    return response;
}

export async function killScript(machine, script){
    const { hostname, ip, user, pass } = getCredentials(machine);
    let response = "";

    await ssh
    .connect({
        host: ip,
        username: user,
        password: pass
    })
    .then(async() => {
        console.log(`Connected to ${hostname}!`);
        await ssh.execCommand("screen -ls")
        .then((resp) => {
            response = resp;
        });
    })
    .then(async() => {
        if(response.stdout.includes("No Sockets found")){
            response = `No scripts running on ${hostname}`;
        } else {
            console.log("There are existing screen sockets!");
            await ssh.execCommand(`screen -S ${script} -X quit`)
            .then((resp) => {
                if(resp.stdout.includes("No screen session found")){
                    response = `No script(s) *${script}* running on *${hostname}*`;
                    console.log("response: ", response);
                } else {
                    response = `Script *${script}* on *${hostname}* killed successfully`;
                }
            })
            .finally(() => {
                console.log("Disconnected \n");
                ssh.dispose();
            });
        }
    })

    return response;
}

// Starts/Restarts running script on machine
export async function startScript(machine, script){
    const { hostname, ip, user, pass } = getCredentials(machine);
    let response = "";

    await ssh
    .connect({
        host: ip,
        username: user,
        password: pass
    })
    .then(async() => {
        console.log(`Connected to ${hostname}!`);
        await ssh.execCommand("screen -ls")
        .then((resp) => {
            response = resp;
        });
    })
    .then(() => {
        if(response.stdout.includes("No Sockets found")){
            response = `No scripts running on ${hostname}`;
        } else {
            response = "Restarted existing screen sockets!";
        }
    })
    .then(async() => {
        switch (script) {
            // Globe GSM server
            case "g5":
                // Run python script in screen
                await ssh.execCommand(`screen -dmS ${script} /home/pi/g5/g5.py`)
                break;
            case "g7":
                // Run python script in screen
                await ssh.execCommand(`screen -dmS ${script} /home/pi/g5/g5.py`)
                break;
            //Smart GSM Server
            case "g4":
                // Run python script in screen
                await ssh.execCommand(`screen -dmS ${script} /home/pi/g5/g5.py`)
                break;
            case "g6":
                // Run python script in screen
                await ssh.execCommand(`screen -dmS ${script} /home/pi/g5/g5.py`)
                break;
            //!! Test using Sandbox, change to MIA during deployment
            case "g5":
                // Run python script in screen
                await ssh.execCommand(`screen -dmS ${script} /home/pi/g5/g5.py`)
                break;
            case "g7":
                // Run python script in screen
                await ssh.execCommand(`screen -dmS ${script} /home/pi/g5/g5.py`)
                break;
            default:
                break;
        }


        await ssh.execCommand(`screen -dmS ${script} -X quit && screen -dmS ${script}`)
            .finally(() => {
                console.log("Disconnected \n");
                ssh.dispose();
            });
    });
    

    return response;
}