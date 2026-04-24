@echo off
setlocal
cd /d "%~dp0"

set REMOTE_URL=https://github.com/faxation/namou-website.git
set REMOTE_NAME=namou-website
set REMOTE_BRANCH=main

echo ================================================================
echo   Syncing local repo to %REMOTE_URL%
echo ================================================================
echo.

:: Ensure the remote is registered (add if missing, update if pointing elsewhere)
git remote get-url %REMOTE_NAME% >nul 2>&1
if errorlevel 1 (
  echo Adding remote "%REMOTE_NAME%" -^> %REMOTE_URL%
  git remote add %REMOTE_NAME% %REMOTE_URL% || goto :error
) else (
  git remote set-url %REMOTE_NAME% %REMOTE_URL% || goto :error
)
echo.

:: Stage every change in the working tree
git add -A || goto :error

:: Commit only if there is something staged
git diff --cached --quiet
if errorlevel 1 (
  echo Committing local changes...
  git commit -m "Sync from local" || goto :error
) else (
  echo No local changes to commit.
)
echo.

:: Fetch remote state so the push is a fast-forward when possible
echo Fetching %REMOTE_NAME%...
git fetch %REMOTE_NAME% %REMOTE_BRANCH% || goto :error
echo.

:: Push the current HEAD to the target branch
echo Pushing HEAD to %REMOTE_NAME%/%REMOTE_BRANCH%...
git push %REMOTE_NAME% HEAD:%REMOTE_BRANCH% || goto :error

echo.
echo ================================================================
echo   Sync complete.
echo ================================================================
echo.
pause
exit /b 0

:error
echo.
echo ================================================================
echo   Sync FAILED. See output above for details.
echo ================================================================
echo.
pause
exit /b 1
