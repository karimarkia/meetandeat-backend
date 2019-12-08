
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg=>{
            // console.log(msg)
            io.emit('chat addMsg', msg)
        })
        socket.on('created', data=>{
            // console.log(data,'counter up')
            io.emit('inc counter', data)
        })
        socket.on('is typing', data=>{
            io.brodcast.emit('print', data)
        })


    })
}