const express = require('express');
const http = require('http');
const scrapeStories = require('./services/hackerNewsScraper');
const { saveStories, initalizeDatabase } = require('./services/database');
const setupWebSocket = require('./services/websocket');
require('dotenv').config();
const {pool} = require('./services/database');

const app = express();
const server = http.createServer(app);
initalizeDatabase();
// pool.execute('CREATE DATABASE HELLO');
// WebSocket
setupWebSocket(server);

// Periodic Scraping
scrapeStories();
setInterval(async () => {
    const stories = await scrapeStories();
    await saveStories(stories);
}, 5 * 60 * 1000); // Every 5 minutes

server.listen(3000, () => {
    console.log('Server running on port 3000');
});