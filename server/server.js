// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise'); // 使用promise接口

const app = express();
const port = process.env.PORT || 3000;

// 创建MySQL连接池
const pool = mysql.createPool({
    host: process.env.DB_HOST || '38.147.***.***',
    user: process.env.DB_USER || 'simple',
    password: process.env.DB_PASSWORD || '123456',
    database: process.env.DB_NAME || 'simple',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: '1kb' }));

// 保存剪贴板内容
app.post('/api/clipboard/save', async (req, res) => {
    try {
        const { content } = req.body;

        // 输入验证
        if (!content || typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({ error: '无效的内容' });
        }

        // 插入数据库
        const [result] = await pool.execute(
            'INSERT INTO clipboard_history (content) VALUES (?)',
            [content.trim()]
        );

        // 自动保留最近100条（可选）
        await pool.execute(
            'DELETE FROM clipboard_history WHERE id <= (SELECT id FROM (SELECT id FROM clipboard_history ORDER BY id DESC LIMIT 1 OFFSET 99) AS temp)'
        );

        // 返回创建结果
        const [newRecord] = await pool.execute(
            'SELECT *, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS formatted_time FROM clipboard_history WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            id: newRecord[0].id,
            content: newRecord[0].content,
            timestamp: newRecord[0].formatted_time
        });

    } catch (error) {
        console.error('保存错误:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

// 获取剪贴板历史
app.get('/api/clipboard/history', async (req, res) => {
    try {
        // 获取最近100条记录
        const [rows] = await pool.query(`
      SELECT 
        id,
        content,
        DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS timestamp 
      FROM clipboard_history 
      ORDER BY created_at DESC 
      LIMIT 100
    `);

        res.json(rows);

    } catch (error) {
        console.error('查询错误:', error);
        res.status(500).json({ error: '服务器内部错误' });
    }
});

// 启动服务
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`MySQL connected to ${process.env.DB_NAME || 'clipboard_db'}`);
});
