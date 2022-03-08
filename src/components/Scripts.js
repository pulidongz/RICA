import { MACHINE_ARR, ssh } from "../../";
import { checkRunningScripts } from "../utils/ShellCommands";


export async function checkScript(req, res) {
    const { machine } = req.body;

    // Check if input is valid, if not, return error
    if(machine !== "all" && !MACHINE_ARR.includes(machine)){
        return res
            .status(400)
            .json({message:"Fail", data: `Machine ${machine} does not exist`});
    }

    try {
        if(machine === "all"){
            const result = [];
            for(const m of MACHINE_ARR){
                const data = await checkRunningScripts(m);
                result.push(data);
            }

            return res.status(200).json({message: "Success", data: result});
        } else {
            const result = await checkRunningScripts(machine);
            return res.status(200).json({message: "Success", data: result});
        }
    } catch (error) {
        console.log(error);
        return res.status(500)
            .status(500)
            .json({ message: "Fail", data: `Error: ${error}`});
    }
}


export async function restartScreens(req, res) {
    const { machine } = req.body;

    // Check if machine is valid, if not, return error
    if(machine !== "all" || !MACHINE_ARR.includes(machine)){
        return res
            .status(400)
            .json({message:"Fail", data: `Machine ${machine} does not exist`});
    }

    try {
        let screen;

        if(machine == "all"){
            console.log(`Checking script on ALL machines`);
            let screen = "ALL";
        } else {
            console.log(`Checking script on ${getCredentials(machine).hostname} machine`);

            let credentials = getCredentials(machine);
            let {hostname, ip, user, pass} = credentials;

            // create SSH connection to machine
            await ssh
            .connect({
                host: ip,
                username: user,
                password: pass
            })
            .then(() => {
                console.log("Connected!");

                ssh.execCommand(`screen -ls`)
                .then(result => {
                    screen = result.stdout;
                    console.log("screen", screen);

                    if(result.stdout.includes("No Sockets found")){
                        console.log("No screen found... restarting screen");
                    }
                    ssh.execCommand(
                        `screen -ls | grep Detached | cut -d. -f1 | awk '{print $1}' | xargs kill ; 
                        screen -dmS g1${hostname} ; 
                        screen -dmS g2${hostname}`)
                    .finally(() => {
                        console.log("Disconnected");
                        ssh.dispose();
                    });
                })
            })
        }
        
        return res.status(200).send({data: {message: `${screen}`}});
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ message: "Fail", data: `${error}`});
    }
}

export async function killScript(req, res) {
    const { machine } = req;
    
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500)
            .status(500)
            .json({ message: "Fail", data: `Error: ${err}`});
    }
}

export async function killAllScripts(req, res) {
    const { machine } = req;
    
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500)
            .status(500)
            .json({ message: "Fail", data: `Error: ${err}`});
    }
}

export async function startScript(req, res) {
    const { machine } = req;
    
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500)
            .status(500)
            .json({ message: "Fail", data: `Error: ${err}`});
    }
}

export async function startAllScripts(req, res) {
    const { machine } = req;
    
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500)
            .status(500)
            .json({ message: "Fail", data: `Error: ${err}`});
    }
}

export async function runInit(req, res) {
    const { machine } = req;
    
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(500)
            .status(500)
            .json({ message: "Fail", data: `Error: ${err}`});
    }
}

