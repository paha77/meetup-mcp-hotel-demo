import React, { useEffect, useRef, useState } from 'react';

import ChatMessage, { type Message } from './ChatMessage';
import { mcpClient } from '../services/mcpClient.ts';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleConnect = async () => {
    setIsLoading(true);
    const result = await mcpClient.initialize();

    if (result.success) {
      setIsConnected(true);
      setMessages([
        {
          id: Date.now().toString(),
          content:
            'Successfully connected to your hotel MCP server! You can now get information about rooms and create hotel bookings.',
          role: 'assistant',
          timestamp: new Date(),
        },
      ]);
    } else {
      alert(`Connection failed: ${result.message}`);
    }
    setIsLoading(false);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading || !isConnected) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      // Build the complete conversation history for the chatbot
      const conversationHistory = [...messages, userMessage];

      // Convert our message format to the format expected by the agent
      const messageHistory = conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      // Send the complete conversation history to the MCP client
      const response = await mcpClient.sendMessage(
        currentInput,
        messageHistory,
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Error: ${error}`,
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  };

  // Add a separate useEffect to handle focusing after loading is complete
  useEffect(() => {
    if (!isLoading && isConnected) {
      inputRef.current?.focus();
    }
  }, [isLoading, isConnected]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Auto-connect on component mount
  useEffect(() => {
    handleConnect();
  }, []);

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Hotel Booking Chat</h2>
        <div className="connection-status">
          <span
            className={`status ${isConnected ? 'connected' : 'disconnected'}`}
          >
            {isConnected ? '🟢 Connected (MCP)' : '🔴 Disconnected (MCP)'}
          </span>
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="loading-indicator">
            <div className="typing-dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <textarea
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask me anything about our rooms and bookings..."
          disabled={isLoading || !isConnected}
          rows={1}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim() || !isConnected}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
