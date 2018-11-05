import React, { Component } from 'react';
import io from 'socket.io-client';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';
import SaveToHomeScreen from './SaveToHomeScreen';
import Setting from '../pages/Setting';
import Messages from '../pages/Messages';
import { encrypt, decrypt, socketStatus } from '../utilities/helpers';
import { socketConfig } from '../utilities/constants';

let socket = null;
let deferredPrompt;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socketStatusCode: socketStatus.connecting,
      username: '',
      password: '',
      currentPath: 'messages',
      messages: []
    };

    this.onEmitPunch = this.onEmitPunch.bind(this);
    this.onLinkTo = this.onLinkTo.bind(this);
    this.onSaveAccount = this.onSaveAccount.bind(this);
    this.onOpenSocket = this.onOpenSocket.bind(this);
    this.onSaveAppToHomeScreen = this.onSaveAppToHomeScreen.bind(this);
  }

  componentDidMount() {
    this.savePWAInstallPrompt();
    this.initApp();
  }

  async initApp() {
    await this.getLocalStorage();

    if (!this.isAccountExist) {
      this.addMessage({
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

    this.addMessage({
      text: '微寶正在與伺服器連線中...'
    });

    socket = io(socketConfig.url);

    socket.on('connect', () => {
      this.setState({
        socketStatusCode: socketStatus.connected
      });

      this.addMessage({
        text: '與伺服器連線成功'
      });
    });

    socket.on('punch', ({ complete, message }) => {
      this.addMessage({ text: message });
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
      this.addMessage({
        text: '微寶無法與伺服器連線，請確認您處於內網狀態'
      });
    });

    socket.on('reconnecting', reconnectTimes => {
      this.addMessage({
        text: `微寶第 ${reconnectTimes + 1} 次嘗試與伺服器連線...`
      });

      if (reconnectTimes >= socketConfig.reconnectAttemptTimes) {
        socket.close();

        this.setState({
          socketStatusCode: socketStatus.disconnected
        });

        this.addMessage({
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
    const { username, password } = this.state;
    return username && password ? true : false;
  }

  onEmitPunch(action) {
    switch (action) {
      case 'in':
        this.addMessage({
          speaker: 'user',
          text: '打卡上班'
        });
        break;
      case 'out':
        this.addMessage({
          speaker: 'user',
          text: '打卡下班'
        });
        break;
      default:
        console.error(`Unknown "${action}" action in onEmitPunch`);
    }

    socket.emit('punch', {
      username: this.state.username,
      password: this.state.password,
      action
    });
  }

  onLinkTo(path) {
    this.setState({
      currentPath: path
    });
  }

  onSaveAccount({ username, password }) {
    this.setState(
      {
        username,
        password
      },
      () => {
        this.onLinkTo('messages');
        this.updateLocalStorage();
        this.addMessage({
          text: '帳號密碼儲存成功'
        });
      }
    );
  }

  getLocalStorage() {
    return new Promise(resolve => {
      const account = window.localStorage.getItem('account');
      if (!account) {
        resolve(null);
        return;
      }

      const { username, password } = JSON.parse(account);

      this.setState({
        username,
        password: decrypt(password)
      });
      resolve('setState');
    });
  }

  updateLocalStorage() {
    const { username, password } = this.state;
    window.localStorage.setItem(
      'account',
      JSON.stringify({
        username,
        password: encrypt(password)
      })
    );
  }

  addMessage({ speaker = 'wavbo', text }) {
    this.setState(prevState => {
      return {
        messages: [
          ...prevState.messages,
          {
            id: prevState.messages.length + 1,
            speaker,
            text
          }
        ]
      };
    });
  }

  savePWAInstallPrompt() {
    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();

      // Stash the event so it can be triggered later.
      deferredPrompt = e;

      return false;
    });
  }

  onSaveAppToHomeScreen() {
    if (deferredPrompt !== undefined) {
      // The user has had a positive interaction with our app and Chrome
      // has tried to prompt previously, so let's show the prompt.
      deferredPrompt.prompt();

      // 看看使用者針對這個 prompt 做了什麼回應
      deferredPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);

        if (choiceResult.outcome === 'dismissed') {
          console.log('User cancelled home screen install');
        } else {
          console.log('User added to home screen');
        }

        // We no longer need the prompt.  Clear it up.
        deferredPrompt = null;
      });
    }
  }

  get isInstallPromptSaved() {
    return deferredPrompt;
  }

  render() {
    const { currentPath, username, password, socketStatusCode } = this.state;

    return (
      <div className="App">
        <Navbar onLinkTo={this.onLinkTo} currentPath={currentPath} />
        <Main currentPath={currentPath}>
          <Messages
            key="messages"
            messages={this.state.messages}
            socketStatusCode={socketStatusCode}
          />
          <Setting
            key="setting"
            username={username}
            password={password}
            onSaveAccount={this.onSaveAccount}
          />
        </Main>
        <Footer
          onEmitPunch={this.onEmitPunch}
          socketStatusCode={socketStatusCode}
          onOpenSocket={this.onOpenSocket}
        />
        {this.isInstallPromptSaved && (
          <SaveToHomeScreen
            onSaveAppToHomeScreen={this.onSaveAppToHomeScreen}
          />
        )}
      </div>
    );
  }
}

export default App;
