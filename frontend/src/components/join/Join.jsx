import { useRef } from 'react';
import io from 'socket.io-client';
import style from './Join.module.css';
import { Input, Button } from '@mui/material'

export default function Join({ setChatVisibility, setSocket }) {

    const usernameRef = useRef();

    const handleSubmit = async () => {

        const username = usernameRef.current.value;

        if (!username.trim()) return

        const socket = await io.connect('https://chat-realtime-nodejs.vercel.app/');
        socket.emit('setUsername', username);
        setSocket(socket);
        setChatVisibility(true);
    }

    return (
        <div className={style['join-container']}>
            <h2>Chat em tempo real</h2>
            <Input inputRef={usernameRef} placeholder='Nome de usuário' />
            <Button sx={{ mt: 2 }} onClick={() => handleSubmit()} variant="contained">Entrar</Button>
        </div>
    );
}
