import React from 'react';
import { connect } from 'react-redux';
import { sample } from './../utilities/helpers';

const BulletinMessagesIsFetching = () => (
  <div className="message-typing">
    <span className="message-typing-bubble" />
    <span className="message-typing-bubble" />
    <span className="message-typing-bubble" />
  </div>
);

class Bulletin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentBulletinMessage: ''
    };
  }

  componentDidUpdate() {
    if (this.state.currentBulletinMessage === '') {
      this.setState({
        currentBulletinMessage: sample(this.props.bulletinMessages)
      });
    }
  }

  render() {
    return (
      <div className="message message-bulletin">
        <div className="message-content">
          {this.state.currentBulletinMessage || <BulletinMessagesIsFetching />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bulletinMessages: state.bulletinMessages
  };
};

export default connect(mapStateToProps)(Bulletin);
