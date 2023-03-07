import styles from '../styles/score.module.css'

export const Score = ({ player, score }) => {
    const style1 = player === 'X' ? `${styles.X}` : `${styles.O}`
    const style2 = player === 'X' ? `${styles.O}` : `${styles.X}`
    return (
        <div className={styles.scoreContainer}>
            <div className={`${styles.score} ${style1}`}>
                <label>{player} (YOU)</label>
                <b>{score.player1}</b>
            </div>
            <div className={`${styles.score} ${styles.ties}`}>
                <label>TIES</label>
                <b>{score.tie}</b>
            </div>
            <div className={`${styles.score} ${style2}`}>
                <label>{player === "X" ? "O" : "X"} (OPP)</label>
                <b>{score.player2}</b>
            </div>
        </div>
    )
}
