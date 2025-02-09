@echo off
setlocal

:: 配置项 - 需要修改的部分
set REPO_URL=git@github.com:qioxso/Clipboard.git
set BRANCH=master
set COMMIT_MSG=自动提交: %date% %time%

:: 检查 public 目录是否存在

:: 进入 public 目录

:: 初始化仓库（如果未初始化）
if not exist ".git\" (
    git init
    git remote add origin %REPO_URL%
)

:: 执行 Git 操作
git add .
git commit -m "%COMMIT_MSG%"
git push -f origin %BRANCH%

echo 推送完成！
pause