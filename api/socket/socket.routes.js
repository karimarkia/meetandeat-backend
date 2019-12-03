
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg=>{
            console.log(msg)
            io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            // io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        // socket.on('chat topic', topic=>{
        //     if (socket.myTopic) {
        //         socket.leave(socket.myTopic)
        //     }
        //     socket.join(topic)
        //     socket.myTopic = topic;
        // })
        // socket.on('test event', data=>{
        //     console.log(data)
        //     io.emit('saying to all', data)
        // })
        socket.on('created', data=>{
            console.log(data,'counter up')
            io.emit('inc counter', data)
        })

    })
}