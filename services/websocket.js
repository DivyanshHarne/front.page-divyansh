const WebSocket = require('ws');
const { getRecentStories } = require('./database');

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', async (ws) => {
        const recentStories = await getRecentStories();
        ws.send(JSON.stringify({ recentStories }));

        ws.on('message', (message) => {
            console.log('Received:', message);
        });
    });
};

module.exports = setupWebSocket;