import React from 'react'
import { connect } from 'react-redux'

import './Header.css'

class Header extends React.Component {
    render() {
        return (
            <div id="header">
                <div id="title">{this.props.locale.title}</div>
                <div id="subtitle">{this.props.locale.subtitle}</div>
            </div>
        )
    }
}

export default connect(
    state => ({
        locale: state.locale
    })
)(Header)
