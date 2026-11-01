@echo off
echo 🤖 WhatsApp Chatbot Setup
echo ========================

REM Install dependencies
echo Installing dependencies...
npm install

REM Check if .env exists
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo.
    echo ⚠️  IMPORTANT: Edit the .env file and add your Twilio and Claude API keys!
    echo.
    echo Then run: ngrok http 3000
    echo And update your Twilio WhatsApp webhook with the ngrok URL.
) else (
    echo .env file already exists.
)

echo.
echo Setup complete! Run: node index.js
pause