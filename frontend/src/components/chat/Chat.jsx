import { useRef, useState, useEffect } from 'react';

export default function Chat({ socket }) { // Adicione socket como uma prop aqui

    const messageRef = useRef();
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on('receivedMessage', data => {
            setMessageList((current) => [...current, data]);
        })

        return () => socket.off('receivedMessage');

    }, [socket]);

    const handleSubmit = async () => {

        const message = messageRef.current.value;
        if (!message.trim()) return

        socket.emit('sendMessage', message);
        clearInput();
    }

    const clearInput = () => {

        messageRef.current.value = '';
    }

    return (
        <div>
            <h1>Chat</h1>
            {
                messageList.map((message, index) => (
                    <p key={index}>{message.username}: {message.text}</p>
                ))
            }
            <input type="text" ref={messageRef} placeholder='Mensagem' />
            <button onClick={() => handleSubmit()}>Enviar</button>
        </div >
    );
}