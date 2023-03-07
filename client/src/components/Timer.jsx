import { useEffect, useState } from 'react'

import styles from '../styles/gameRoom.module.css'

export const Timer = ({ isMyTurn, player, symbol, updateBoard, isGameStarted }) => {
    // const [seconds, setSeconds] = useState(10);

    // useEffect(() => {
    //     if (isMyTurn && isGameStarted && seconds > 0) {
    //         setTimeout(() => setSeconds(seconds - 1), 1000);
    //     }
    // }, [seconds]);

    // const remainingMinutes = Math.floor(seconds / 60);
    // const remainingSeconds = seconds % 60;

    return (
        <div className={styles.timer}>
            <h1>{player}</h1>
            {symbol}
            {/* <h1>
                {remainingMinutes}:{remainingSeconds < 10 && '0'}{remainingSeconds}
            </h1> */}
        </div>
    )
}
