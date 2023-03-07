import { Circle, Cross } from '../assets/icons';
import { Timer } from './Timer'
import { GameHeader } from './GameHeader';

import styles from '../styles/gameRoom.module.css';

export const GameTimers = ({ turn, isMyturn, player, updateBoard, isGameStarted }) => {
    const player2 = turn === 'X' ? 'O' : 'X'

    const Player1 = () => {
        return (
            <Timer
                player='Player 1'
                symbol={
                    turn === 'X'
                        ? (<Cross fill="#31c3bd" height="40px" width="40px" />)
                        : (<Circle fill="#f2b137" height="50px" width="50px" />)
                }
                isMyTurn={isMyturn}
                updateBoard={updateBoard}
                isGameStarted={isGameStarted}
            />
        )
    }

    const Player2 = () => {
        return (
            <Timer
                player='Player 2'
                symbol={
                    player2 === 'X'
                        ? (<Cross fill="#31c3bd" height="40px" width="40px" />)
                        : (<Circle fill="#f2b137" height="50px" width="50px" />)
                }
                isMyTurn={!isMyturn}
                updateBoard={updateBoard}
                isGameStarted={isGameStarted}
            />
        )
    }

    return (
        <div className={styles.timersContainer}>
            <Player1 />
            <GameHeader turn={player} />
            <Player2 />
        </div>
    )
}
