import http from 'http';
import { Server as SocketServer, } from "socket.io";
import { getRoom } from './helpers/getRoom';
const server = require('./server');

const app = http.createServer(server)

const io = new SocketServer(app, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconected`)
    })

    socket.on('join_game', async (message) => {
        console.log(`${socket.id} joined room => ${message.roomId}`);
        const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
        const socketRooms = Array.from(socket.rooms.values()).filter(room => room !== socket.id);

        if (socketRooms.length > 0 || connectedSockets && connectedSockets.size === 2) {
            socket.emit('room_join_error', {
                error: 'Room is full please choose another room to play!'
            })
        } else {
            await socket.join(message.roomId);
            socket.emit('room_joined')

            if (io.sockets.adapter.rooms.get(message.roomId)?.size === 2) {
                setTimeout(() => {
                    socket.emit("start_game", { start: true, turn: 'X', player: '2' })
                }, 1000);
                setTimeout(() => {
                    socket
                        .to(message.roomId)
                        .emit("start_game", { start: false, turn: 'O', player: '1' })
                }, 1000);
            }
        }
    })

    socket.on('update_game', (message) => {
        const gameRoom = getRoom(socket);
        socket.to(gameRoom).emit('on_game_update', message)
    })

    socket.on('game_win', (message) => {
        const gameRoom = getRoom(socket)
        socket.to(gameRoom).emit('on_game_win', message)
    })

    socket.on('leave_room', (message) => {
        const gameRoom = getRoom(socket)
        socket.to(gameRoom).emit('user_disconected', message)
    })

    socket.on('play_again', (message) => {
        const gameRoom = getRoom(socket)
        socket.to(gameRoom).emit('new_game', message)
    })
})

module.exports = app;


