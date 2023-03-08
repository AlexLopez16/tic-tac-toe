import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { GameRoom } from './pages/GameRoom';
import socketService from './services/socketService';

function App() {
    const URL = import.meta.env.VITE_REACT_APP_API_URL;
    const connectSocket = async () => {
        await socketService
            .conect(URL)
            .catch(err => {
                console.log('Error: ', err);
            })
    }

    useEffect(() => {
        connectSocket();
    }, [])


    const [isInRoom, setIsInRoom] = useState(false)
    const RoomRender = () => {
        if (!isInRoom) {
            return (
                <HomePage
                    isInRoom={isInRoom}
                    setIsInRoom={setIsInRoom}
                />
            )
        }

        return (
            <GameRoom />
        )
    }

    return (
        <div className='container'>
            <RoomRender />
        </div>
    )
}

export default App;