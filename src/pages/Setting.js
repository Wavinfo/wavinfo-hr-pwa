import React from 'react';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.usernameRef = React.createRef();
    this.passwordRef = React.createRef();

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    this.props.onSaveAccount({
      username: this.usernameRef.current.value,
      password: this.passwordRef.current.value
    });
  }

  render() {
    const { username, password } = this.props;
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
            onClick={this.onClick}
          >
            儲存
          </button>
        </form>
      </div>
    );
  }
}

export default Setting;
