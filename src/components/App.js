import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';
import WhatToEat from './WhatToEat';
import Setting from '../pages/Setting';
import Messages from '../pages/Messages';
import { socketStatus, decrypt } from '../utilities/helpers';
import { SOCKET_CONFIG } from '../utilities/constants';
import { addMessage, getLocalStorageAsync, fetchGistAsync } from './../actions';

let socket = null;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socketStatusCode: socketStatus.connecting
    };

    this.onEmitPunch = this.onEmitPunch.bind(this);
    this.onOpenSocket = this.onOpenSocket.bind(this);
  }

  componentDidMount() {
    this.initApp();
    this.props.fetchGistAsync();
  }

  async initApp() {
    await this.props.getLocalStorageAsync();
    if (!this.isAccountExist) {
      this.props.addMessage({
        text: '請先點選右上方的齒輪，設置您的帳號密碼'
      });
    }

    this.setState({
      socketStatusCode: socketStatus.connecting
    });

    this.registerSocket();
  }

  registerSocket() {
    // 如果 socket 存在，則不要註冊
    if (socket !== null) {
      return;
    }

    this.props.addMessage({
      text: '微寶正在與伺服器連線中...'
    });

    socket = io(SOCKET_CONFIG.url);

    socket.on('connect', () => {
      this.setState({
        socketStatusCode: socketStatus.connected
      });

      this.props.addMessage({
        text: '與伺服器連線成功'
      });
    });

    socket.on('punch', ({ complete, message }) => {
      this.props.addMessage({ text: message });
      this.setState({
        socketStatusCode: socketStatus.punching
      });

      if (complete) {
        this.setState({
          socketStatusCode: socketStatus.connected
        });
      }
    });

    // Connection Error Handler
    socket.on('connect_error', () => {
      this.props.addMessage({
        text: '微寶無法與伺服器連線，請確認您處於內網狀態'
      });
    });

    socket.on('reconnecting', reconnectTimes => {
      this.props.addMessage({
        text: `微寶第 ${reconnectTimes + 1} 次嘗試與伺服器連線...`
      });

      if (reconnectTimes >= SOCKET_CONFIG.reconnectAttemptTimes) {
        socket.close();

        this.setState({
          socketStatusCode: socketStatus.disconnected
        });

        this.props.addMessage({
          text: '還是無法與伺服器連線，微寶放棄了...'
        });
      }
    });
    // End of Connection Error Handler
  }

  onOpenSocket() {
    socket.open();
    this.setState({
      socketStatusCode: socketStatus.connecting
    });
  }

  get isAccountExist() {
    const { username, password } = this.props;
    return username && password ? true : false;
  }

  onEmitPunch(action) {
    switch (action) {
      case 'in':
        this.props.addMessage({
          speaker: 'user',
          text: '打卡上班'
        });
        break;
      case 'out':
        this.props.addMessage({
          speaker: 'user',
          text: '打卡下班'
        });
        break;
      default:
        console.error(`Unknown "${action}" action in onEmitPunch`);
    }

    socket.emit('punch', {
      username: this.props.username,
      password: this.props.password && decrypt( this.props.password),
      action
    });
  }

  render() {
    const { socketStatusCode } = this.state;
    const { username, password, messages } = this.props;

    return (
      <div className="App">
        <Navbar />
        <Main>
          <Messages
            key="messages"
            messages={messages}
            socketStatusCode={socketStatusCode}
          />
          <Setting key="setting" username={username} password={password} />
        </Main>
        <Footer
          onEmitPunch={this.onEmitPunch}
          socketStatusCode={socketStatusCode}
          onOpenSocket={this.onOpenSocket}
        />
        {<WhatToEat addMessage={this.addMessage} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    username: state.settings.username,
    password: state.settings.password
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMessage: message => dispatch(addMessage(message)),
    getLocalStorageAsync: () => dispatch(getLocalStorageAsync()),
    fetchGistAsync: () => dispatch(fetchGistAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
