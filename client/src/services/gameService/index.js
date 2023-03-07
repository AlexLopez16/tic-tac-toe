export const joinGameRoom = (socket, roomId) => {
    return new Promise((res, rej) => {
        socket.emit('join_game', { roomId });
        socket.on('room_joined', () => res(true))
        socket.on('room_join_error', ({ error }) => rej(error))
    })
}

export const updateGame = (socket, gameIndex, player) => {
    socket.emit('update_game', { index: gameIndex, turn: player })
}

export const onGameUpdate = (socket, listener) => {
    socket.on('on_game_update', ({ index, turn }) => {
        listener(index, turn)
    })
}

export const onStartGame = (socket, listener) => {
    socket.on('start_game', listener)
}

export const gameWin = (socket, winner, score) => {
    socket.emit('game_win', { winner, score })
}

export const onGameWin = (socket, listener) => {
    socket.on('on_game_win', (message) => {
        listener(message)
    })
}

export const disconnect = (socket, message) => {
    socket.emit('leave_room', { leave: message })
}

export const onDisconnect = (socket, listener) => {
    socket.on('user_disconected', listener)
}

export const newGame = (socket, message) => {
    socket.emit('play_again', { lastTurn: message })
}

export const onNewGame = (socket, listener) => {
    socket.on('new_game', listener)
}