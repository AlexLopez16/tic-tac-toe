import { Circle, Cross } from "../assets/icons"

import styles from '../styles/gameRoom.module.css'

export const GameHeader = ({ turn }) => {

    const RenderTurn = () => {
        if (turn === 'X') {
            return (
                <Cross fill="#a8bfc9" height="20px" width="20px" />
            )
        } else {
            return (
                <Circle fill="#a8bfc9" height="30px" width="30px" />
            )
        }
    }

    return (
        <div className={styles.gameTurn}>
            <RenderTurn />
            <label>TURN</label>
        </div>
    )
}
