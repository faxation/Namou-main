@echo off
setlocal
cd /d "%~dp0"

set REMOTE_URL=https://github.com/faxation/namou-website.git
set REMOTE_NAME=namou-website
set REMOTE_BRANCH=main

echo ================================================================
echo   Syncing local repo with %REMOTE_URL%
echo ================================================================
echo.

:: Ensure the remote is registered and points at the correct URL
git remote get-url %REMOTE_NAME% >nul 2>&1
if errorlevel 1 (
  echo Adding remote "%REMOTE_NAME%" -^> %REMOTE_URL%
  git remote add %REMOTE_NAME% %REMOTE_URL% || goto :error
) else (
  git remote set-url %REMOTE_NAME% %REMOTE_URL% || goto :error
)
echo.

:: Fetch the latest state of the remote branch
echo Fetching %REMOTE_NAME%/%REMOTE_BRANCH%...
git fetch %REMOTE_NAME% %REMOTE_BRANCH% || goto :error
echo.

:: Stage every local change
git add -A || goto :error

:: Commit only if something is staged
git diff --cached --quiet
if errorlevel 1 (
  echo Committing local changes...
  git commit -m "Sync from local" || goto :error
) else (
  echo No local changes to commit.
)
echo.

:: Merge any remote commits into local so local includes everything
echo Merging %REMOTE_NAME%/%REMOTE_BRANCH% into local...
git merge %REMOTE_NAME%/%REMOTE_BRANCH% --no-edit --allow-unrelated-histories
if errorlevel 1 (
  echo.
  echo Merge stopped — there are conflicts to resolve by hand.
  echo Resolve them, run: git commit, then re-run this script.
  goto :error
)
echo.

:: Push combined history back to remote
echo Pushing to %REMOTE_NAME%/%REMOTE_BRANCH%...
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
