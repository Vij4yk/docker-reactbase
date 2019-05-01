import React from 'react'
import {connect} from 'react-redux'

import FormGroup from '../../share/FormGroup'

class SigninForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            unique_name_tag: '',
            password: '',
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()
    }
    
    render() {
        const l = this.props.locale
        return (
            <form onSubmit={this.onSubmit}>
                <FormGroup name="unique_name_tag" value={this.state.unique_name_tag} onChange={this.onChange}  label={l.unique_name_tag_label} type="text" />
                <FormGroup name="password" value={this.state.password} onChange={this.onChange}  label={l.password_label} type="password" />
                <button type="submit" className="btn btn-primary">{l.submit}</button>
            </form>
        )
    }
}

export default connect(
    state => ({
        locale: state.locale
    })
)(SigninForm)
