const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io')

const app = express();
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('room', (data) => {
        socket.join(data)
    })

    socket.on('message', (data) => {
        //socket.broadcast.emit('messageReturn',data) //paylasan kisi haric herkese gonder diyor
        socket.to(data.room).emit('messageReturn', data) // sadece joinlenmis kisileri gonderiyor artik
    })

})

const PORT = 5000;
server.listen(PORT, () => {
    console.log('server is running on port: 5000')
})