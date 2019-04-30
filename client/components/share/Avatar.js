import React from 'react'

//props
// src: String
// className: String
export default class Avatar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <img 
                src={this.props.src} alt="Avatar"
                className={this.props.className}
            />
        )
    }
}
