import React from 'react'
import { connect } from 'react-redux'

import FormGroup from '../../share/FormGroup'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            unique_name_tag: '',
            email: '',
            password: '',
            password_confirmation: '',
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

    // description VARCHAR(512),
    // avatar LONGBLOB,
    render() {
        const locale = this.props.locale
        return (
            <form onSubmit={this.onSubmit}> 
                <FormGroup name="unique_name_tag" value={this.state.unique_name_tag} onChange={this.onChange} label={locale.unique_name_tag_label} />
                <FormGroup name="email" value={this.state.email} onChange={this.onChange} label={locale.email_label} type="email" />
                <FormGroup name="password" value={this.state.password} onChange={this.onChange} label={locale.password_label} type="password" />
                <FormGroup name="password_confirmation" value={this.state.password_confirmation} onChange={this.onChange} label={locale.password_confirmation_label} />
                <button type="submit" className="btn btn-primary">{locale.submit}</button>
            </form>
        )
    }
}

// export default 
export default connect(
    state => ({
        locale: state.locale
    })
)(RegisterForm)
