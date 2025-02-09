//mysql命令
-- 创建数据库和用户（示例）
CREATE DATABASE clipboard_db;
CREATE USER 'clipboard_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON clipboard_db.* TO 'clipboard_user'@'localhost';
FLUSH PRIVILEGES;

-- 创建表
USE clipboard_db;
CREATE TABLE clipboard_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
