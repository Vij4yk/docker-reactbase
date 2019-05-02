import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from 'react-router-dom'

import FontAwesomeBtn from '../share/FontAwesomeBtn'
import { setAuthTokenAction } from "../redux/SetAuthToken"
import { setUserAction } from "../redux/SetUser"

import './Navbar.css'

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }

    signout() {
        this.props.setAuthCode(null)
        this.props.setUser({})
    }

    render() {
        if (!this.props.authed) {
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
        } else {
            return (
                <div id='top-navbar'>
                    <div className="row">
                    <div className="col-4">
                        <Link to='/' className="deco-none">
                            <img className="pl-3" src={this.props.user.avatar} alt="avatar" />
                            <b className="h5 ml-3">{this.props.user.display_name}</b>
                        </Link>
                    </div>  
                    <div className="col-4 content-center">
                        <Link to="/" className="deco-none">
                            <FontAwesomeBtn
                                fontAwesome='fa-2x fa fa-file mt-2' />
                        </Link>
                    </div>
                    <div className="col-4">
                        <div className='pull-right pr-3'>
                            <Link to="/" className="deco-none">
                                <FontAwesomeBtn 
                                    onClick={this.signout.bind(this)} 
                                    fontAwesome='fa fa-sign-out ' 
                                    text={'\u00a0' + this.props.locale.signout} />
                            </Link>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
    }
}

// export default 
export default connect(
    state => ({
        locale: state.LocaleReducer.locale,
        authed: state.SetUserReducer.authed,
        user: state.SetUserReducer.user
    }),
    dispatch => ({
        setAuthCode: (code) => dispatch(setAuthTokenAction(code)),
        setUser: (user) => dispatch(setUserAction(user))
    })
)(Navbar)
