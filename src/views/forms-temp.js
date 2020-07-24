import React, { Component } from 'react';
import Input from './components/Input/Input'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rePassword: '',
      error: false
    }
  }

  handleBlur = (e) => {
    console.log('blur');
    if (!e.includes('@')) {
      this.setState({
        error: true
      })
    } else {
      this.setState({ error: false })
    }
  }

  changeEmail = value => {
    this.setState({
      email: value
    })
  }
  changePass = value => {
    this.setState({
      password: value
    })
  }
  changeRePass = value => {
    this.setState({
      rePassword: value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    console.log(this.state);
  }

  render() {
    const {
      email,
      password,
      rePassword
    } = this.state
    return (
      <div>
        <h1>Controlled Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.state.error ? <h2>ERROR</h2> : ''}
          <Input id="email" label="Email" onChange={this.changeEmail} value={email} onBlur={this.handleBlur}></Input>
          <Input id="password" label="Password" onChange={this.changePass} value={password}></Input>
          <Input id="rePassword" label="Re Password" onChange={this.changeRePass} value={rePassword}></Input>

          <button type="submit">Submit</button>

        </form>
      </div>
    );
  }
}

export default App;



