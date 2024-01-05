const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: 'http://localhost:5173' } }); //limitando requisições
const PORT = process.env.PORT || 3000;

io.on('connection', (socket) => {
    console.log('Usuário conectado!', socket.id);

    socket.on('disconnect', reason => {
        console.log('Usuário desconectado!', socket.id);
    });

    socket.on('setUsername', username => {
        socket.data.username = username;
    })

    socket.on('sendMessage', text => {
        io.emit('receivedMessage', {
            text,
            authorId: socket.id,
            username: socket.data.username
        })
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});