function created(res, location){
    res.status(201).set('Location', location).end()
}

function ok(res, body){
    res.status(200).json(body)
}

function patched(res){
    res.status(204).end()
}

module.exports = {
    created,
    ok,
    patched
}