import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//构建代码之后的服务器文件

const app = express();

// 静态资源中间件，指定 dist 目录为静态资源目录
app.use(express.static(path.join(__dirname, 'dist')));

// 处理所有路由，返回 index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 监听端口
const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
        console.error(`Failed to start server on port ${port}:`, err);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});