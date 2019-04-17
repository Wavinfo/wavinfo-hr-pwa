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
import { addMessage, resetMessage, getLocalStorageAsync, fetchGistAsync } from './../actions';
import Frame from './../components/Frame';

let socket = null;

const startCountDownTime = 1555493452577;
const timeUpAt = 1556616600000;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socketStatusCode: socketStatus.connecting,
    };

    /* static variables */
    this.visibilityChange = '';

    this.onEmitPunch = this.onEmitPunch.bind(this);
    this.onOpenSocket = this.onOpenSocket.bind(this);
    this.registerPageVisibilityChange = this.registerPageVisibilityChange.bind(this);
    this.handlePageVisibilityChange = this.handlePageVisibilityChange.bind(this);
  }

  componentDidMount() {
    this.initApp();
    this.props.fetchGistAsync();
  }

  componentWillUnmount() {
    document.removeEventListener(this.visibilityChange, this.handlePageVisibilityChange, false);
  }

  async initApp() {
    this.props.resetMessage();
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
    this.registerPageVisibilityChange();
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

  registerPageVisibilityChange() {
    // Set the name of the hidden property and the change event for visibility
    // check MDN for more details, https://goo.gl/2LMnJo
    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this.visibilityChange = 'visibilitychange';
    } else if (typeof document.msHidden !== 'undefined') {
      this.visibilityChange = 'msvisibilitychange';
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.visibilityChange = 'webkitvisibilitychange';
    }

    if (this.visibilityChange !== undefined) {
      document.addEventListener(this.visibilityChange, this.handlePageVisibilityChange, false);
    }
  }

  handlePageVisibilityChange() {
    if (document.hidden) {
      this.props.resetMessage();
    }
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
    const currentTime = new Date().getTime();
    const isOver = currentTime > timeUpAt;
    const grayScale = ((currentTime - startCountDownTime) / (timeUpAt - startCountDownTime)).toFixed(2);

    return (
      <div className="App" style={{ filter: `grayScale(${ grayScale })`}}>
        { isOver ? <Frame /> : <Navbar /> }
        <Main isOver={isOver}>
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
        {!isOver && <WhatToEat addMessage={this.addMessage} />}
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
    resetMessage: () => dispatch(resetMessage()),
    getLocalStorageAsync: () => dispatch(getLocalStorageAsync()),
    fetchGistAsync: () => dispatch(fetchGistAsync())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
