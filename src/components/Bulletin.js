import React from 'react';

const BulletinMessagesIsFetching = () => (
  <div className="message-typing">
    <span className="message-typing-bubble" />
    <span className="message-typing-bubble" />
    <span className="message-typing-bubble" />
  </div>
)

class Bulletin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="message message-bulletin">
        <div className="message-content">
          {this.props.currentMessage || <BulletinMessagesIsFetching />}
        </div>
      </div>
    );
  }
}

export default Bulletin;
