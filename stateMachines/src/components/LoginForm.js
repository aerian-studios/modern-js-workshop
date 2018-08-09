import React, { PureComponent } from 'react';

class LoginForm extends PureComponent {
  state = {
    username: '',
    password: ''
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.login(Object.assign({}, this.state));
  }

  handleChange = (event) => {
    this.setState({[event.target.id]: event.target.value});
  }

  render() {
    const {username, password} = this.state;

    return (<form onSubmit={this.handleSubmit}>
      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input type="text" value={username} onChange={this.handleChange} id="username" />
      </div>
      <div className="input-group">
        <label htmlFor="password">password</label>
        <input type="password" value={password} onChange={this.handleChange} id="password" />
      </div>
      <input type="submit" value="Log in" />
    </form>)
  }
}

export default LoginForm;