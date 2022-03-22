import { MACHINE_ARR } from "../../instance/config";
import child_process from 'child_process';
import { NodeSSH } from "node-ssh";
import moment from 'moment';

const ssh = new NodeSSH();


/*
 * Sleep function :)
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
 * Checks if "host_id" is a valid machine
 */
export function execShellCommand(cmd){
    return new Promise((resolve, reject) => {
        child_process.exec(cmd, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            } 
            else if (stderr) {
                reject(stderr);
            }
            else {
                resolve(stdout);
            }
        });
    });
}

/*
 * Checks if "host_id" is a valid machine
 */
export function checkIfValidMachine(machine){
    if(machine !== "all" && !Object.keys(MACHINE_ARR).includes(machine))
        return ({
            status: false, data: `Sorry, machine *${machine}* does not exist`
        });
    return ({
        status: true, data: `Machine ${machine} exists`
    });
}

/*
 * Checks if "script" matches to a valid script in the machine
 */
export function checkIfValidScript(machine, script){
    if((MACHINE_ARR[machine].scripts).includes(script) || script === "all")
        return ({
            status: true, data: `Script ${script} exists`
        });
    return ({
        status: false, data: `Script *${script}* does not exist`
    });
}

/*
 * Obtain credentials from .env file
 */
export function getCredentials(machine){
    switch(machine){
        case "50":
            return {
                hostname: "Rack Server (Main)",
                ip: process.env.RACK_SERVER_IP,
                user: process.env.RACK_SERVER_USER,
                pass: process.env.RACK_SERVER_PASS
            };
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

/*
 * Checks all / specific runnning scripts on the specified machine
 */
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

/*
 * Reboots specified machine then re-runs scripts on crontab
 */
export async function rebootMachine(machine){
    const { hostname, ip, user, pass } = getCredentials(machine);
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

        await ssh.execCommand(`sudo reboot`);
    })
    .finally(() => {
        console.log("Disconnected \n");
        ssh.dispose();
    });
    
    response = `*${hostname}* rebooted successfully!`;

    return response;
}

/*
 * Kills specific script on specified machine
 */
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

/*
 * Kill ALL scripts on specified machine
 */
export async function killAllScript(machine){
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
        await ssh.execCommand("killall screen")
        .then((resp) => {
            if(resp.stdout.includes("screen: no process found")){
                response = `No script(s) running on *${hostname}*`;
            } else {
                response = `All scripts on *${hostname}* killed successfully`;
            }
        })
    })
    .finally(() => {
        console.log("Disconnected \n");
        ssh.dispose();
    });

    return response;
}

/*
 * Start / Restart running script(s) on specified machine
 */
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
            response = resp.stdout;
            console.log("screen_output:", response);
        });
    })
    .then(async() => {
        // NO currently runnning screens:
        if(response.includes("No Sockets found")){
            response = `No scripts running on *${hostname}*. Starting *${script}*`;
            await ssh.execCommand(runScreenCommand(hostname, script))
        } else {
            response = `Starting script *${script}* on *${hostname}*`;
            console.log(response);
            await ssh.execCommand(`screen -wipe`)
            await ssh.execCommand(`screen -S ${script} -Q echo '$PID'`)
            .then(async(resp) => {
                console.log("screen_process_id: ", resp.stdout);
                // Screen DNE
                if(resp.stdout.includes("No screen session found.")){
                    // Start new screen
                    await ssh.execCommand(runScreenCommand(hostname, script))
                } else {
                    // Screen exists, restart it
                    await ssh.execCommand(`screen -S ${resp.stdout} -X quit`)
                    // Restart script
                    .then(async() => {
                        await ssh.execCommand(runScreenCommand(hostname, script));
                        // await ssh.execCommand(`/usr/bin/screen -dmS ${script} -X quit && screen -dmS ${script}`)
                    });
                }
            }) 
        }
    })
    .finally(() => {
        console.log("Disconnected \n");
        ssh.dispose();
    });
    
    return response;
}

/*
 * Start / Restart ALL script(s) on specified machine
 */
export async function startAllScript(machine){
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
        await ssh.execCommand("killall screen")
        .then(async(resp) => {
            if(resp.stdout.includes("screen: no process found")){
                response = `No script(s) running on *${hostname}*`;
            } else {
                response = `All scripts on *${hostname}* killed successfully`;
            }
            console.log(response);
        })
    })
    .then(async() => {
        for(const script of MACHINE_ARR[machine].scripts){   
            await ssh.execCommand(runScreenCommand(hostname, script));
            // Wait 5 seconds before executing next script
            await sleep(5000);
        }
    })
    .finally(() => {
        console.log("Disconnected \n");
        ssh.dispose();
    });
    
    response = "Started all scripts successfully!";

    return response;
}

/*
 * Contains screen commands per machine
 */
export function runScreenCommand(hostname, script){
    switch (script) {
        case "t1":
            // *Test script p1.py, remove on production!
            console.log("starting t1");
            return `/usr/bin/screen -dmS ${script} /usr/bin/python /home/pi/t1.py`
        case "t2":
            // *Test script p2.py, remove on production!
            console.log("starting t2");
            return `/usr/bin/screen -dmS ${script} /usr/bin/python /home/pi/t2.py`

        // Sandbox Server | MIA Server => Highcharts
        case "highcharts_server":
            console.log("starting highcharts_server");
            return `/usr/bin/screen -dmS ${script} bash -c "highcharts-export-server -enableServer 1"`

            // Sandbox Server | MIA Server => Flask
        case "flask_server":
            console.log("starting flask_server");
            if(hostname === "MIA"){
                return `/usr/bin/screen -dmS ${script} bash -c "cd /var/www/flask_server; /home/mia/miniconda3/bin/python run.py -ew"`
            } else {
                return `/usr/bin/screen -dmS ${script} bash -c "cd /var/www/flask_server; /home/sandbox-server/miniconda/bin/python run.py -ew"`
            }

            // Sandbox Server | MIA Server => Celery-Beat
        case "beat_celery":
            console.log("starting beat_celery");
            return `/usr/bin/screen -dmS ${script} bash -c "cd /var/www/flask_server; celery beat -A launch_worker.CELERY -l info -eag -er -egd"`

            // Sandbox Server | MIA Server => Celery-Worker
        case "worker_celery":
            console.log("starting worker_celery");
            if(hostname === "MIA"){
                return `/usr/bin/screen -dmS ${script} bash -c "cd /var/www/flask_server; celery worker -A launch_worker.CELERY -l info -c 8 -eag -ec -er --purge`
            }
            return `/usr/bin/screen -dmS ${script} bash -c "cd /var/www/flask_server; celery worker -A launch_worker.CELERY -l info -c 8 -eag -ec -er"`

            // 91, 92
        case "g5" || "g7" || "g4" || "g6":
            console.log("starting sms loggers");
            return `/usr/local/bin/python3.6 /home/pi/dyna3_gsm/utils/watchdog.py -mloggers -${script}`

            // 93
        case "g2" || "g3":
            console.log("starting sms chatterbox");
            return `/usr/local/bin/python3.6 /home/pi/dyna3_gsm/utils/watchdog.py -musers -${script}`
    }
}

/*
 * Node ping test
 */
export async function checkNetwork(machine){
    const { hostname, ip } = getCredentials(machine);
    let response;
    try {
        response = await execShellCommand(`ping -c 5 ${ip}`);
        response = `Network stat from *${hostname}*:\n${response.substring(response.indexOf("5 packets"), response.length)}`;
    } catch (error) {
        response = `Network Error: could not ping *${hostname}*`;
    }
    
    return response
}