import Cross from '../assets/cross-filled-svg.svg'
import Circle from '../assets/circle-filled-svg.svg'

import socketService from '../services/socketService'
import { disconnect, newGame } from '../services/gameService'

import styles from '../styles/modal.module.css'

export const WinnerModal = ({ player, winner, openWinnerModal, setOpenWinnerModal, resetGame }) => {
    const socket = socketService.socket;

    const handleQuit = () => {
        disconnect(socket, true)
        window.location.reload()
    }

    const handleNewGame = () => {
        resetGame()
        setOpenWinnerModal(false)
        newGame(socket, winner)
    }

    const WinnerLabel = () => {
        if (winner === false) return null;
        const label = winner === player ? 'YOU WON!' : 'OH NO, YOU LOST...'
        const winnImg = winner === 'X' ? Cross : Circle
        const winnStyle = winner === 'X' ? `${styles.winnerX}` : `${styles.winnerO}`
        return (
            <>
                <p>{label}</p>
                <h3 className={winnStyle}>
                    <img src={winnImg} alt='Winner Icon' style={{ marginRight: '10px' }} />
                    TAKES THE ROUND
                </h3>
            </>
        )
    }

    const TieLabel = () => {
        if (winner !== false) return null;
        return (
            <h3 style={{ fontSize: '3rem' }}>ROUND TIED</h3>
        )
    }

    const WinnerDecision = () => {
        if (winner === player) return null;
        return (
            <p>Waiting for the winner decision...</p>
        )
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent} >
                <WinnerLabel />
                <TieLabel />
                <WinnerDecision />
                <div className={styles.modalFooter}>
                    <button className={styles.grey} style={{ fontSize: '1rem' }} onClick={handleQuit}> QUIT </button>
                    {
                        winner === player && <button className={styles.orange} style={{ fontSize: '1rem' }} onClick={handleNewGame}> NEXT ROUND </button>
                    }
                </div>
            </div>
        </div>
    )
}