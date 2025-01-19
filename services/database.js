const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const saveStories = async (stories) => {
    const connection = await pool.getConnection();
    try {
        for (const story of stories) {
            await connection.execute(
                'INSERT INTO stories (title, url) VALUES (?, ?)',
                [story.title, story.url]
            );
        }
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

module.exports = { saveStories, getRecentStories };