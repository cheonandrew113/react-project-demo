import React, { Component } from 'react'
import Stock from '../stock/Stock'
import { connect } from 'react-redux'
import { firestoreconnect, firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
// import Charts from '../chart/Charts'
import Wallet from '../stock/Wallet'

class Dashboard extends Component {
  


  render() {
    
    // I will comment the auth out for demonstration purposes.
    // console.log(this.props);
    const { projects, auth } = this.props;
    // if (!auth.uid) return <Redirect to='signin' />


    return (
      <div >
        <div >
          <div >
            <Stock />
          </div>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(Dashboard)