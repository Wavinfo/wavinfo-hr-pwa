import React from 'react';
import Bulletin from './Bulletin';
import { sample } from './../utilities/helpers';

let isOverflow;

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bulletinMessages: []
    }
  }

  componentDidMount() {
    this.mainElement = document.querySelector('[data-target="main"]');
    this.messagesElement = document.querySelector('[data-target="messages"]');
    this.fetchBulletinMessages();
  }

  componentDidUpdate() {
    // Messages Component 的捲軸會移到最後一則訊息，
    // 其他的 Component 都是捲軸都是移到最頂端

    isOverflow =
      this.messagesElement.offsetHeight > this.mainElementInnerHeight;

    if (this.props.currentPath === 'messages' && isOverflow) {
      this.scrollToLastMessageElement();
    } else {
      this.mainElement.scroll(0, 0);
    }
  }

  fetchBulletinMessages() {
    return fetch('https://api.github.com/gists/ef19b4c3586c4aca7e719abd56fedd10')
      .then(response => response.json())
      .then(data => {
        this.setState({
          bulletinMessages: JSON.parse(data.files['bulletin.json'].content).bulletinMessages
        })
      })
      .catch(error => {
        this.addMessage({
          text: `取得資料時發生錯誤（${error}）`
        })
      })
  }

  scrollToLastMessageElement() {
    const lastMessageElement = document.querySelector('.message:last-child');

    if (!lastMessageElement) {
      return;
    }

    lastMessageElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  navigateToCurrentPath(currentPath) {
    const currentPathIndex = this.props.children.findIndex(
      component => component.key === currentPath
    );

    if (currentPathIndex === -1) {
      throw new Error(
        `There is no corresponding component for "${currentPath}" path.
        Please make sure you set the right "key" attribute of component in App.js`
      );
    }

    return currentPathIndex;
  }

  get mainElementInnerHeight() {
    const paddingTop = parseFloat(
      window.getComputedStyle(this.mainElement).getPropertyValue('padding-top')
    );
    const paddingBottom = parseFloat(
      window
        .getComputedStyle(this.mainElement)
        .getPropertyValue('padding-bottom')
    );
    return this.mainElement.offsetHeight - paddingTop - paddingBottom;
  }

  render() {
    const { currentPath, children } = this.props;
    return (
      <main className="block-main" data-target="main">
        <div
          className="container h-100"
          style={{
            transform: `translate(-${this.navigateToCurrentPath(currentPath) *
              100}%)`
          }}
        >
          {children}
        </div>
        {!isOverflow && <Bulletin currentMessage={sample(this.state.bulletinMessages)} />}
      </main>
    );
  }
}

export default Main;
