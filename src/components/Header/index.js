// Write your JS code here
import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <img
        alt="website logo"
        className="web-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
      />

      <nav className="nav-container">
        <div className="nav-item-container">
          <Link to="/" className="home nav-link">
            <li> Home</li>
          </Link>

          <Link to="/products" className="products nav-link">
            <li> Products</li>
          </Link>

          <Link to="/cart" className="cart nav-link">
            <li> Cart</li>
          </Link>

          <button onClick={onLogout} type="button" className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Header)
