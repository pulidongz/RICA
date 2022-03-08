export async function checkNetwork(req, res) {
    res.status(200).send({data: {message: `checkNetwork`}});

}

export async function checkLatency(req, res) {
    res.status(200).send({data: {message: `checkLatency`}});

}

