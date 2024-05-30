// Write your JS code here
import {Component} from 'react'
import Cookie from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', errorMsg: '', isLoginFailed: false}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookie.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
    console.log(this.props)
  }

  onSubmitFailure = errMsg => {
    this.setState({errorMsg: errMsg, isLoginFailed: true})
    Cookie.remove('jwt_token')
  }

  submitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(loginApiUrl, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
    console.log(data)
  }

  render() {
    console.log(this.state)
    const {errorMsg, isLoginFailed} = this.state

    const jwtToken = Cookie.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect path="/" />
    }

    return (
      <div className="login-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="website-login-img"
        />
        <form onSubmit={this.submitForm} className="login-form">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label className="username-label" htmlFor="username">
            {' '}
            USERNAME
          </label>
          <input
            id="username"
            type="text"
            className="username"
            placeholder="Username"
            onChange={this.onChangeUsername}
          />
          <label className="password-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            id="password"
            type="password"
            className="password"
            placeholder="Password"
            onChange={this.onChangePassword}
          />

          <button className="login-btn" type="submit">
            Login
          </button>
          {isLoginFailed && <p className="error-msg"> {`*${errorMsg}`} </p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
