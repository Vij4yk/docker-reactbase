import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import FormGroup from '../../share/FormGroup'

class RegisterForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            unique_name_tag: '',
            email: '',
            password: '',
            password_confirmation: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onPwdConfirmationChange = this.onPwdConfirmationChange.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({errors: {...this.state.errors, [e.target.name]: ''}})
    }

    onPwdConfirmationChange(e) {
        this.onChange(e)
        let err = ''
        if (this.state.password != e.target.value) {
           err = this.props.locale.password_not_match_error
        }
        this.setState({ errors: {...this.state.errors, password_confirmation: err} })
    }

    onSubmit(e) {
        e.preventDefault()
        
        axios.post('/api/u/register', this.state)
        .then(res => {
            let errs = res.data.errors
            if(errs) {
                this.setState({errors: errs})
            } else {
                // login
            }
        })
        .catch(console.log)
    }

    // description VARCHAR(512),
    // avatar LONGBLOB,
    render() {
        const locale = this.props.locale
        return (
            <form onSubmit={this.onSubmit}> 
                <FormGroup 
                    name="unique_name_tag" 
                    value={this.state.unique_name_tag}
                    error={this.state.errors.unique_name_tag} 
                    onChange={this.onChange} 
                    label={locale.unique_name_tag_label} />
                <FormGroup 
                    name="email" 
                    value={this.state.email} 
                    error={this.state.errors.name} 
                    onChange={this.onChange} 
                    label={locale.email_label} 
                    type="email" />
                <FormGroup 
                    name="password" 
                    value={this.state.password} 
                    error={this.state.errors.password} 
                    onChange={this.onChange} 
                    label={locale.password_label} 
                    type="password" />
                <FormGroup 
                    name="password_confirmation" 
                    value={this.state.password_confirmation} 
                    error={this.state.errors.password_confirmation} 
                    onChange={this.onPwdConfirmationChange} 
                    label={locale.password_confirmation_label}  
                    type="password"/>
                <button type="submit" className="btn btn-primary">
                    {locale.submit}
                </button>
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
