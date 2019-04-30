import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from 'react-router-dom'

import FontAwesomeBtn from '../share/FontAwesomeBtn'

import './Navbar.css'

class Navbar extends React.Component {
    render() {
        return (
            <div id='top-navbar'>
                <div className='pull-right pr-3'>
                    <Link className="deco-none" to="/register">
                        <FontAwesomeBtn fontAwesome="fa fa-user-plus" text={this.props.locale.register} />
                    </Link>
                    <Link className="deco-none" to="/signin">
                        <FontAwesomeBtn fontAwesome='fa fa-sign-in' text={'\u00a0' + this.props.locale.sigin} />
                    </Link>
                </div>
            </div>
        )
    }
}

// export default 
export default connect(
    state => ({
        locale: state.locale
    })
)(Navbar)
