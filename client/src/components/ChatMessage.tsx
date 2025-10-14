import React from 'react';

export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface MessageProps {
  message: Message;
}

const ChatMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <div className={`message ${message.role}`}>
      <div className="message-header">
        <span className="role">
          {message.role === 'user' ? 'You' : 'Assistant'}
        </span>
        <span className="timestamp">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
      <div className="message-content">{message.content}</div>
    </div>
  );
};

export default ChatMessage;
