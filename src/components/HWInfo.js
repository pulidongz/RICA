import { rebootMachine } from "./utils/ShellCommands.js";


// const MACHINE_ARR = ["91", "92", "93", "110", "111", "112", "253", "94"]
const MACHINE_ARR = ["94"]

export async function checkHealth(req, res) {
    res.status(200).send({data: {message: `checkHealth`}});

}

export async function checkDisk(req, res) {
    res.status(200).send({data: {message: `checkDisk`}});

}

export async function reboot(req, res) {
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
                const data = await rebootMachine(m);
                result.push(data);
            }

            return res.status(200).json({message: "Success", data: result});
        } else {
            const result = await rebootMachine(machine);
            return res.status(200).json({message: "Success", data: result});
        }
    } catch (error) {
        console.log(error);
        return res.status(500)
            .status(500)
            .json({ message: "Fail", data: `Error: ${error}`});
    }
}

export async function showUptime(req, res) {
    res.status(200).send({data: {message: `showUptime`}});

}

export async function showScreens(req, res) {
    res.status(200).send({data: {message: `showScreens`}});

}

export async function rebootRack(req, res) {
    res.status(200).send({data: {message: `rebootRack`}});

}

export async function rackStatus(req, res) {
    res.status(200).send({data: {message: `rackStatus`}});

}