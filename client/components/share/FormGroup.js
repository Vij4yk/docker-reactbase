import React from 'react'

// props:
// id, label, type, placeholder, error
export default class FormGroup extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input className="form-control"
                    autoComplete="off"
                    type={this.props.type}  
                    id={this.props.id} 
                    value={this.props.value}
                    name={this.props.name}
                    onChange={this.props.onChange} />
                    <small className="form-text text-danger">{this.props.error}</small>
            </div>
        )
    }
}
