import React from 'react'

// props
// fontAwesome: font awesome class
// text: display next to font awesome icon
// onClick
export default class FontAwesomeBtn extends React.Component {
    render() {
        return (
            <div onClick={this.props.onClick}>
                <i className={this.props.fontAwesome}></i> {this.props.text}
            </div>
        )
    }
}
