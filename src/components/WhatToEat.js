import React from 'react';
import { sample } from './../utilities/helpers';

class WhatToEat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      restaurants: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchRestaurants();
  }

  handleClick(e) {
    e.preventDefault();
    this.props.addMessage({
      speaker: 'user',
      text: '微寶，今天吃啥？'
    })

    this.fetchRestaurants()
      .then(() => {
        this.props.addMessage({
          text: sample(this.state.restaurants)
        })
      })
  }

  fetchRestaurants() {
    return fetch('https://api.github.com/gists/ef19b4c3586c4aca7e719abd56fedd10')
      .then(response => response.json())
      .then(data => {
        this.setState({
          restaurants: JSON.parse(data.files['messages.json'].content).restaurants
        })
      })
      .catch(error => {
        console.log(`取得資料時發生錯誤（${error}）`)
      })
  }

  render() {
    return (
      <a
        className="btn-floating btn-large waves-effect waves-light d-flex align-items-center z-depth-3"
        style={{
          position: 'fixed',
          right: 15,
          bottom: 65,
          backgroundColor: 'rgb(130, 210, 210)'
        }}
        onClick={this.handleClick}
      >
        <i className="icon icon-utensils" />
      </a>
    );
  }
}

export default WhatToEat;
