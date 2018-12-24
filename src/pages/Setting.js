import React from 'react';
import { connect } from 'react-redux';
import { updateSetting, linkTo } from '../actions';
import { encrypt, decrypt } from './../utilities/helpers';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
  }

  handleSaveButtonClick(e) {
    e.preventDefault();

    this.props.updateSetting({
      username: this.usernameRef.current.value,
      password: encrypt(this.passwordRef.current.value)
    });

    this.props.linkTo('messages');
  }

  render() {
    const { username, password } = this.props.settings;
    return (
      <div className="col">
        <form>
          <div className="input-field">
            <input
              id="username"
              type="text"
              defaultValue={username}
              ref={this.usernameRef}
              autoComplete="username"
            />
            <label htmlFor="username">帳號</label>
          </div>

          <div className="input-field">
            <input
              id="password"
              type="password"
              defaultValue={password}
              ref={this.passwordRef}
              autoComplete="current-password"
            />
            <label htmlFor="password">密碼</label>
          </div>

          <button
            className="btn waves-effect waves-light right"
            type="button"
            onClick={this.handleSaveButtonClick}
          >
            儲存
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    settings: {
      ...state.settings,
      password: state.settings.password && decrypt(state.settings.password)
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateSetting: account => dispatch(updateSetting(account)),
    linkTo: page => dispatch(linkTo(page))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
