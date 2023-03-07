import styles from '../styles/board.module.css'

export const SquareBoard = ({ children, updateBoard, index, turn }) => {
    const addStyle = turn === 'X' ? `${styles.previewX}` : `${styles.previewO}`
    const addTurn = children === 'X' ? `${styles.X}` : `${styles.O}`
    const changeClass = children ? `${styles.active} ${addTurn}` : `${styles.empty}`

    const handleClick = (e) => {
        updateBoard(index);
    }

    return (
        <div
            className={`${styles.square} ${changeClass}`}
            onClick={handleClick}
            onMouseEnter={e => e.target.classList.add(addStyle)}
            onMouseLeave={e => e.target.classList.remove(addStyle)}
        >
        </div>
    )
}
