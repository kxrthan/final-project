import React, { useState, useRef, useEffect } from 'react';
import one from "../../assets/logos/one.png";
import './Chatbot.css';
 

const systemMessage = { role: 'system', content: 'Your task is to give  to documentation with an explanation to code given by the user.' };

const OPENAI_API_KEY = "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"; // Replace this with your actual OpenAI API key.

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { message: "Hello, I'm your bot! Ask me  about codebase!", sender: 'ChatGPT' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState('');
  
  const messagesEndRef = useRef(null); // Create a ref for scrolling

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    const userMessage = { message: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    setIsTyping(true);
    await processMessageToChatGPT([...messages, userMessage]);
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((msg) => ({
      role: msg.sender === 'ChatGPT' ? 'assistant' : 'user',
      content: msg.message,
    }));

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...apiMessages],
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestBody),
      });
      const data = await response.json();
      const botMessage = data.choices[0].message.content;
      setMessages((prev) => [...prev, { message: botMessage, sender: 'ChatGPT' }]);
      setIsTyping(false);
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
    }
  }

  // Scroll to the bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      {!isOpen && (
        <button className="toggle-button" onClick={handleToggle}>
          <img src={one} alt="Open Chatbot Icon" />
        </button>
      )}
      {isOpen && (
        <div className="chatbot-container">
          <button className="close-button" onClick={handleToggle}>
            &times;
          </button>
          <aside className="chatbot-sidebar">
            <h2>ChatBot Assistant</h2>
          </aside>
          <div className="chatbot-main">
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <div key={idx} className={`message ${msg.sender}`}>
                  <p>{msg.message}</p>
                </div>
              ))}
              {isTyping && <div className="typing">ChatGPT is typing...</div>}
              <div ref={messagesEndRef} /> {/* Reference for scrolling */}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;



