import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'

import { setUserAction } from "../../redux/SetUser"
import { setAuthTokenAction } from '../../redux/SetAuthToken'
import FormGroup from '../../share/FormGroup'

class SigninForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            unique_name_tag: '',
            password: '',
            errors: {},
            loading: false,
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
        this.setState({errors: {...this.state.errors, [e.target.name]: ''}})
    }

    onSubmit(e) {
        e.preventDefault()

        const errorExist = Object.keys(this.state.errors).some((key) => {
            return this.state.errors[key]
        })

        if (!this.state.unique_name_tag || !this.state.password || errorExist) return

        this.setState({loading: true})
        axios.post('/api/u/signin', this.state) 
        .then(res => {
            if (res.data.errors) {
                this.setState({errors: res.data.errors})
            } else {
                const token = res.data
                this.props.setAuthToken(token)
                this.props.setUser(jwt.decode(token))
            }
        })
        .catch(console.log) 
        this.setState({loading: false})      
    }
    
    render() {
        if (this.props.authed) {
            return (<Redirect to='/' />) // user already login
        }

        const l = this.props.locale
        return (
            <form onSubmit={this.onSubmit}>
                <FormGroup 
                    name="unique_name_tag" 
                    value={this.state.unique_name_tag} 
                    onChange={this.onChange}  
                    label={l.unique_name_tag_label} 
                    type="text" 
                    error={this.state.errors.unique_name_tag} />
                <FormGroup 
                name="password" 
                value={this.state.password} 
                onChange={this.onChange}  
                label={l.password_label} 
                type="password" 
                error={this.state.errors.password} />
                <button type="submit" className="btn btn-primary" disabled={this.state.loading}>{l.submit}</button>
            </form>
        )
    }
}

export default connect(
    state => ({
        locale: state.LocaleReducer.locale,
        authed: state.SetUserReducer.authed
    }),
    dispatch => ({
        setAuthToken: (jwt) => dispatch(setAuthTokenAction(jwt)),
        setUser: (user) => dispatch(setUserAction(user))
    })
)(SigninForm)
