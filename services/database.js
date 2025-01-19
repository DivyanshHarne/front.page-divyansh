const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'wordpass4',
    database: process.env.DB_DATABASE || 'frontpage-database',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0 
});

const createDatabase = async () => {
    const connection = await pool.getConnection();
}
const initalizeDatabase = async () => {
    const connection = await pool.getConnection();
    try {
        await pool.execute('CREATE DATABASE IF NOT EXISTS frontpage-database');

        await pool.execute(`
            CREATE TABLE IF NOT EXISTS stories (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                url VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        
    }
}


const saveStories = async (stories) => {
    const connection = await pool.getConnection();
    try {
        for (const story of stories) {
            await connection.execute(
                'INSERT INTO stories (title, url) VALUES (?, ?)',
                [story.title, story.url]
            );
        }
    } catch (error) {
        console.error('Error saving stories:', error);
    } finally {
        connection.release();
    }
};

const getRecentStories = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM stories WHERE created_at >= NOW() - INTERVAL 5 MINUTE'
    );
    return rows;
};

module.exports = { saveStories, getRecentStories, pool, initalizeDatabase };