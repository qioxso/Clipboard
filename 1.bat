@echo off
setlocal

:: ������ - ��Ҫ�޸ĵĲ���
set REPO_URL=git@github.com:qioxso/Clipboard.git
set BRANCH=master
set COMMIT_MSG=�Զ��ύ: %date% %time%

:: ��� public Ŀ¼�Ƿ����

:: ���� public Ŀ¼

:: ��ʼ���ֿ⣨���δ��ʼ����
if not exist ".git\" (
    git init
    git remote add origin %REPO_URL%
)

:: ִ�� Git ����
git add .
git commit -m "%COMMIT_MSG%"
git push -f origin %BRANCH%

echo ������ɣ�
pause