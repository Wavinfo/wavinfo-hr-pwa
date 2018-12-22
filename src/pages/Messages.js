import React from 'react';
import { connect } from 'react-redux';
import { addMessage } from './../actions'
import { socketStatus } from './../utilities/helpers';
import wavbo from './../images/wavbo.png';

const MessageIsTyping = () => {
  return (
    <div className="message message-left">
      <div className="message-avatar">
        <img src={wavbo} alt="wavbo" className="message-avatar-img" />
      </div>

      <div className="message-typing">
        <span className="message-typing-bubble" />
        <span className="message-typing-bubble" />
        <span className="message-typing-bubble" />
      </div>
    </div>
  );
};

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

const Messages = ({ messages, socketStatusCode }) => (
  <div className="col messages" data-target="messages">
    {messages.map(message => (
      <Message key={message.id} {...message} />
    ))}
    {socketStatusCode === socketStatus.punching && <MessageIsTyping />}
  </div>
);

const mapStateToProps = state => {
  return {
    messages: state.messages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(addMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
