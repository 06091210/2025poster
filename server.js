const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('新しい接続がありました！');

    socket.on('message', (message) => {
        console.log(`受信メッセージ: ${message}`);
        socket.send(`あなたが送ったメッセージ: ${message}`);
    });
});

console.log('WebSocketサーバーが8080番ポートで起動しました。');
