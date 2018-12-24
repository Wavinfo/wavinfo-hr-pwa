import React from 'react';
import { connect } from 'react-redux';
import { sample } from './../utilities/helpers';
import { addMessage } from './../actions';

class WhatToEat extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.timer = this.timer.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.addMessage({
      speaker: 'user',
      text: '微寶，今天吃啥？'
    });

    this.timer(() => {
      this.props.addMessage({
        text: sample(this.props.restaurants)
      });
    }, 500)
  }

  timer(fn, timeout) {
    setTimeout(() => {
      fn()
    }, timeout);
  }

  render() {
    return (
      <a
        href="#"
        className="btn-floating btn-large waves-effect waves-light d-flex align-items-center z-depth-3"
        style={{
          position: 'fixed',
          right: 15,
          bottom: 65,
          backgroundColor: '#66c5c0'
        }}
        onClick={this.handleClick}
      >
        <i className="icon icon-utensils" />
      </a>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(addMessage(message))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WhatToEat);
