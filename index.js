const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

const conversations = new Map();

function getConversation(sessionId) {
  if (!conversations.has(sessionId)) {
    conversations.set(sessionId, {
      messages: [],
      context: 'You are a helpful personal assistant. Keep responses concise and friendly.',
    });
  }
  return conversations.get(sessionId);
}

function buildClaudeMessages(messages) {
  const formatted = [{ role: 'system', content: messages.context || 'You are a helpful assistant.' }];
  messages.messages.forEach(msg => {
    const role = msg.role === 'user' ? 'user' : 'assistant';
    formatted.push({ role, content: msg.content });
  });
  return formatted;
}

app.post('/webhook', async (req, res) => {
  try {
    const { Body, From, To } = req.body;
    const sessionId = From;

    const conv = getConversation(sessionId);
    conv.messages.push({ role: 'user', content: Body });

    const claudeMessages = buildClaudeMessages(conv);

    let aiResponse;

    if (Body.toLowerCase().includes('hello') || Body.toLowerCase().includes('hi')) {
      aiResponse = 'Hey there! 👋 How can I help you today?';
    } else if (Body.toLowerCase().includes('how are you')) {
      aiResponse = "I'm doing great, thanks for asking! How are you doing?";
    } else if (Body.toLowerCase().includes('time')) {
      const now = new Date();
      aiResponse = `Current time: ${now.toLocaleTimeString()}`;
    } else if (Body.toLowerCase().includes('weather')) {
      aiResponse = "I don't have access to real-time weather, but you can check your favorite weather app!";
    } else if (Body.toLowerCase().includes('remind')) {
      aiResponse = 'I can help with reminders! Just tell me what to remind you about and when.';
    } else {
      aiResponse = `Thanks for your message: "${Body}". I'm your personal WhatsApp assistant! I can help with questions, set reminders, or just chat. What's on your mind?`;
    }

    conv.messages.push({ role: 'assistant', content: aiResponse });

    if (conv.messages.length > 20) {
      conv.messages = conv.messages.slice(-20);
    }

    const messagingResponse = new twilio.twiml.MessagingResponse();
    messagingResponse.message(aiResponse);

    res.type('text/xml').send(messagingResponse.toString());
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('Error');
  }
});

app.get('/', (req, res) => {
  res.send('WhatsApp Chatbot is running! 🤖');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🤖 WhatsApp chatbot running on port ${PORT}`);
  console.log(`📡 Webhook URL: http://localhost:${PORT}/webhook`);
});

module.exports = app;