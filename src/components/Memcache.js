export async function statusMemcache(req, res) {
    res.status(200).send({data: {message: `statusMemcache`}});

}

export async function restartMemcache(req, res) {
    res.status(200).send({data: {message: `restartMemcache`}});

}

export async function stopMemcache(req, res) {
    res.status(200).send({data: {message: `stopMemcache`}});

}

export async function startMemcache(req, res) {
    res.status(200).send({data: {message: `startMemcache`}});

}