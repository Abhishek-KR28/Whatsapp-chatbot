# WhatsApp Personal Assistant Chatbot

A simple AI-powered WhatsApp personal assistant built with **Twilio** (WhatsApp API) and **Claude** (AI brain).

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js** v18+ installed
- **Twilio account** (free trial at twilio.com)
- **Ngrok** for local testing (`npm install -g ngrok` or download from ngrok.com)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Copy `.env.example` to `.env` and fill in your credentials:
```bash
copy .env.example .env
```

**Required values:**
- `TWILIO_ACCOUNT_SID` - From Twilio Console dashboard
- `TWILIO_AUTH_TOKEN` - From Twilio Console dashboard
- `TWILIO_WHATSAPP_NUMBER` - Your Twilio WhatsApp sandbox number (e.g., `whatsapp:+14155238886`)
- `CLANE_API_KEY` - Your Anthropic API key (from console.anthropic.com)

### 4. Run the Bot
```bash
node index.js
```

### 5. Expose with Ngrok (in another terminal)
```bash
ngrok http 3000
```

### 6. Configure Twilio Webhook
1. Go to **Twilio Console > Messaging > Try it out > Send a WhatsApp message**
2. Join the sandbox by sending the code to the WhatsApp number
3. Go to **Twilio Console > Messaging > Settings > WhatsApp sandbox settings**
4. Set **Webhook URL** to: `https://YOUR_NGROK_URL/webhook`
5. Save

### 7. Test It!
Send a WhatsApp message to your Twilio sandbox number.

---

## 📁 Project Structure
```
whatsapp-chatbot/
├── index.js          # Main server & webhook handler
├── package.json      # Dependencies
├── .env              # Your credentials (create from .env.example)
├── .env.example      # Template
├── setup.bat         # Windows setup script
└── README.md         # This file
```

---

## 🤖 Features
- ✅ Conversation memory (remembers last 10 exchanges)
- ✅ AI-powered responses (Claude Haiku 4.5)
- ✅ Simple keyword-based fallback responses
- ✅ Webhook verification ready
- ✅ Health check endpoint at `/`

---

## 🔧 Customization

### Add Real Claude API Integration
Replace the keyword-based responses in `index.js` with actual Anthropic API calls:

```javascript
const Anthropic = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({ apiKey: process.env.CLANE_API_KEY });

// In your webhook handler:
const response = await anthropic.messages.create({
  model: 'claude-3-5-haiku-20241022',
  max_tokens: 1000,
  system: 'You are a helpful personal assistant.',
  messages: claudeMessages,
});
const aiResponse = response.content[0].text;
```

### Add More Features
- **Reminders**: Store reminder data in memory or a database
- **Notes**: Save user notes with timestamps
- **Weather**: Integrate a weather API
- **Calendar**: Connect to Google Calendar

---

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| "Webhook failed" | Check ngrok is running and URL is correct in Twilio |
| "Invalid credentials" | Verify `.env` has correct Twilio SID/Token |
| "Cannot find module" | Run `npm install` |
| No response on WhatsApp | Check Twilio logs in Console for errors |

---

## 📚 Next Steps
1. **Add real Claude API** - Install `@anthropic-ai/sdk` and replace mock responses
2. **Persist memory** - Use a database (SQLite, MongoDB) instead of in-memory Map
3. **Deploy** - Host on Railway, Render, or Heroku for 24/7 uptime
4. **Add features** - Reminders, notes, weather, calendar integration

---

## 💡 Tips for Beginners
- Use `npm run dev` for auto-reload on changes (requires nodemon)
- Check Twilio Console > Monitor > Logs for debugging
- Keep ngrok running while testing
- The free Twilio trial only works with verified numbers

---

Built with ❤️ for learning WhatsApp bot development!