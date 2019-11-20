import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import './nav.css'
// import Stock from '../stock/Stock'

const Navbar = (props) => {

  const { auth, profile } = props
  // console.log("authin", auth)
  const links = auth.uid ?  <SignedInLinks profile={profile}/> : <SignedOutLinks /> 

  return (
    <nav id="nav-bar"className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">Real Time Stock Quotes</Link>
        {/* <Stock /> */}
    
      </div>
        <div className="other-links">

          { links }
        </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)