import React from 'react';
import wavbo from './../images/wavbo.png';

const Message = ({ speaker, text }) => {
  if (speaker === 'wavbo') {
    return (
      <div className="message message-left">
        <div className="message-avatar">
          <img src={wavbo} alt={speaker} className="message-avatar-img" />
        </div>
        <p className="message-content">{text}</p>
      </div>
    );
  } else {
    return (
      <div className="message message-right">
        <p className="message-content">{text}</p>
      </div>
    );
  }
};

const Messages = ({ messages }) => (
  <div className="col" data-target="messages">
    {messages.map(message => (
      <Message key={message.id} {...message} />
    ))}
  </div>
);

export default Messages;
