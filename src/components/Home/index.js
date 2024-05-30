// Write your JS code here
import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

import Header from '../Header'

import './index.css'

class Home extends Component {
  render() {
    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="home">
        <Header />

        <div className="home-container">
          <div>
            <h1 className="home-heading"> Clothes That Get YOU Noticed </h1>
            <p className="home-description">
              {' '}
              Fashion is part of the daily air and it does not quite help that
              it changes all the time. Clothes have always been a marker of the
              era and we are in a revolution. Your fashion makes you been seen
              and heard that way you are. So, celebrate the seasons new and
              exciting fashion in your own way.{' '}
            </p>
            <button className="shop-now-btn" type="button">
              {' '}
              Shop Now{' '}
            </button>
          </div>

          <img
            className="home-img"
            alt="clothes that get you not noticed"
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          />
        </div>
      </div>
    )
  }
}

export default Home
