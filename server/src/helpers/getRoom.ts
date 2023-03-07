import { Socket } from "socket.io";

export const getRoom = (socket: Socket): string => {
    const socketRooms = Array.from(socket.rooms.values()).filter(room => room !== socket.id)
    const gameRoom = socketRooms && socketRooms[0]

    return gameRoom
}