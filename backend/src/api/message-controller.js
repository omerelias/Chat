const messageController = {
    createMessage: (io) => (req, res) => {
        io
            .to(req.body.agentName)
            .emit('message', req.body.message);
        //todo: send the message on socket to the client that is in the same room (but not to the sender)
        res.end();
    }
}

module.exports = messageController;