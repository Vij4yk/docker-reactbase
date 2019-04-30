import React from 'react'

// props:
// id, label, type, placeholder
export default class FormGroup extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input type={this.props.type} className="form-control" 
                    id={this.props.id} placeholder={this.props.placeholder} />
            </div>
        )
    }
}
