import { useState } from 'react'

import { joinGameRoom } from '../services/gameService';
import socketService from '../services/socketService';

import styles from '../styles/modal.module.css'

export const JoinRoomModal = ({ isInRoom, setIsInRoom, openModal, setOpenModal }) => {
    const [roomName, setRoomName] = useState('');
    const [isJoining, setIsJoining] = useState(false);

    const socket = socketService.socket;

    const handleInputChange = (e) => {
        setRoomName(e.target.value)
    }

    const joinRoom = async (e) => {
        e.preventDefault()
        if (!roomName || roomName.trim() === '' || !socket)
            return setOpenModal({
                ...openModal,
                multiplayer: false
            });

        setIsJoining(true);

        const joined = await joinGameRoom(socket, roomName)
            .catch(err => {
                alert(err)
            })

        if (joined) {
            setIsInRoom(true);
            setOpenModal({
                ...openModal,
                multiplayer: false
            });
        }
        setIsJoining(false);
    }

    return (
        <div className={styles.modal} >
            <div className={`${styles.modalContent} `} >
                <h3>Enter room ID to Join the Game</h3>
                <div className={styles.modalFooter}>
                    <form onSubmit={joinRoom}>
                        <div className={styles.roomContainer}>
                            <input
                                placeholder='Room ID'
                                value={roomName}
                                onChange={handleInputChange}
                                className={styles.roomInput}
                            />
                            <button className={styles.grey} type='submit' disabled={isJoining}>
                                {isJoining ? 'Joining...' : 'Join'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
