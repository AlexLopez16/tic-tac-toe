import { useState } from 'react'
import { Circle, Cross } from '../assets/icons'
import { ComingModal, JoinRoomModal } from '../components'

import styles from '../styles/home.module.css'

export const HomePage = ({ isInRoom, setIsInRoom }) => {
    const [openModal, setOpenModal] = useState({
        cpu: false,
        multiplayer: false
    });

    const handleOpenModal = (e) => {
        setOpenModal({
            ...openModal,
            [e.target.id]: true
        })
    }

    const OpenComingModal = () => {
        if (!openModal.cpu) return null;

        return (
            <ComingModal
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        )
    }

    const OpenJoinRoomModal = () => {
        if (!openModal.multiplayer) return null;

        return (
            <JoinRoomModal
                isInRoom={isInRoom}
                setIsInRoom={setIsInRoom}
                openModal={openModal}
                setOpenModal={setOpenModal}
            />
        )
    }

    return (
        <div className={styles.menu} >
            <h1>Welcome to Tic-Tac-Toe</h1>

            <div className={styles.menuHeader} >
                <Cross fill='#31c3bd' width='40px' height='40px' />
                <Circle fill='#f2b137' width='50px' height='50px' />
            </div>

            <div className={styles.menuOptions} >
                <button
                    className={`${styles.menuBtn} ${styles.btnOrange}`}
                    id='cpu'
                    onClick={handleOpenModal}
                >
                    NEW GAME&nbsp;&nbsp;(VS CPU)
                </button>

                <button
                    className={`${styles.menuBtn} ${styles.btnBlue}`}
                    id='multiplayer'
                    onClick={handleOpenModal}
                >
                    NEW GAME&nbsp;&nbsp;(VS PLAYER)
                </button>
            </div>

            <OpenComingModal />
            <OpenJoinRoomModal />
        </div>
    )
}
