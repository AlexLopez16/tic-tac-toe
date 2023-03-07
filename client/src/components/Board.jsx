import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'

import socketService from '../services/socketService'
import { gameWin, onDisconnect, onGameUpdate, onGameWin, onNewGame, onStartGame, updateGame } from '../services/gameService'
import { checkEndGame, checkWinner } from '../helpers/checkBoard'

import { SquareBoard } from './SquareBoard'
import { GameTimers } from './GameTimers'
import { Score } from './Score'
import { WinnerModal } from './WinnerModal'
import { UserLeaveModal } from './UserLeaveModal'

import styles from '../styles/board.module.css'

export const Board = () => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState('')
    const [player, setPlayer] = useState('X')
    const [isMyTurn, setIsMyTurn] = useState(false)
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [winner, setWinner] = useState(null)
    const [score, setScore] = useState({
        player1: 0,
        tie: 0,
        player2: 0
    })
    const [openWinnerModal, setOpenWinnerModal] = useState(false);
    const [userLeave, setUserLeave] = useState(false);

    const socket = socketService.socket;

    const updateBoard = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board]
        newBoard[index] = turn;
        setBoard(newBoard)

        const newPlayer = player === 'X' ? 'O' : 'X'
        setPlayer(newPlayer)

        if (socket) {
            updateGame(socket, newBoard, player)
            setIsMyTurn(false)
        }

        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
            setOpenWinnerModal(true)
            if (newWinner === turn) {
                setScore({
                    ...score,
                    player1: score.player1 += 1,
                })
            } else if (newWinner !== turn) {
                setScore({
                    ...score,
                    player2: score.player2 += 1
                })
            }
            gameWin(socket, newWinner, score)
        } else if (checkEndGame(newBoard)) {
            setWinner(false)
            setScore({
                ...score,
                tie: score.tie += 1
            })
            gameWin(socket, false, score)
        }
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        const newTurn = turn === 'X' ? 'O' : 'X'
        setTurn(newTurn)
        setWinner(null)
        setPlayer('X')
        setIsGameStarted(true)
        if (newTurn === 'X') {
            setIsMyTurn(true)
        } else if (newTurn === 'O') {
            setIsMyTurn(false)
        }
    }

    const handleGameUpdate = () => {
        onGameUpdate(socket, (newBoard, newPlayer) => {
            const player = newPlayer === 'X' ? 'O' : 'X'
            setPlayer(player)
            setBoard(newBoard)
            setIsMyTurn(true)
            setIsGameStarted(true)
        })
    }

    const handleStartGame = () => {
        if (socket) {
            onStartGame(socket, (options) => {
                setTimeout(() => {
                    setIsGameStarted(true)
                    setTurn(options.turn)
                    if (options.start)
                        setIsMyTurn(true);
                    else
                        setIsMyTurn(false);
                }, 3000);
            })
        }
    }

    const handleGameWin = () => {
        if (socket) {
            onGameWin(socket, (message) => {
                setWinner(message.winner)
                setOpenWinnerModal(true)
                setScore({
                    player1: message.score.player2,
                    tie: message.score.tie,
                    player2: message.score.player1
                })
            })
        }
    }

    const handleUserLeave = () => {
        if (socket) {
            onDisconnect(socket, (message) => {
                setUserLeave(true)
                setWinner(null)
            })
        }
    }

    const handleNewGame = () => {
        if (socket) {
            onNewGame(socket, (message) => {
                setUserLeave(false)
                setOpenWinnerModal(false)
                setBoard(Array(9).fill(null))
                const newTurn = message.lastTurn === 'X' ? 'X' : 'O'
                setTurn(newTurn)
                setWinner(null)
                setIsGameStarted(true)
                setPlayer('X')
                if (newTurn === 'X') {
                    setIsMyTurn(true)
                } else if (newTurn === 'O') {
                    setIsMyTurn(false)
                }
            })
        }
    }

    useEffect(() => {
        handleGameUpdate()
        handleStartGame()
        handleGameWin()
        handleUserLeave()
        handleNewGame()
    }, [])

    const Message = () => {
        if (!isGameStarted) {
            return (
                <h2 style={{ textAlign: 'center' }}>Waiting for other player to join to start the game...</h2>
            )
        }

        return null;
    }

    const BlockTurn = () => {
        if (!isGameStarted || !isMyTurn) {
            return (
                <div className={styles.blockTurn}></div>
            )
        }

        return null;
    }

    const OpponentMessage = () => {
        if (isGameStarted && !isMyTurn && winner === null) {
            return (
                <p className={`${styles.message}`} >
                    Your opponent is thinking...
                </p>
            )
        }
        return null;
    }

    return (
        <div>
            <GameTimers player={player} isMyturn={isMyTurn} turn={turn} updateBoard={updateBoard} isGameStarted={isGameStarted} />
            <Message />
            <BlockTurn />
            <div className={styles.board}>
                {
                    board.map((_, index) => (
                        <SquareBoard
                            key={index}
                            index={index}
                            updateBoard={updateBoard}
                            turn={turn}
                        >
                            {board[index]}
                        </SquareBoard>
                    ))
                }
            </div>
            <Score player={turn} score={score} />
            <OpponentMessage />
            {
                openWinnerModal && (
                    <WinnerModal
                        player={turn}
                        winner={winner}
                        resetGame={resetGame}
                        openWinnerModal={openWinnerModal}
                        setOpenWinnerModal={setOpenWinnerModal}
                    />
                )
            }
            {
                userLeave && <UserLeaveModal />
            }
        </div>
    )
}
