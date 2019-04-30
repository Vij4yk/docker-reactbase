import React from 'react'
import {connect} from 'react-redux'

import FormGroup from '../../share/FormGroup'

class SigninForm extends React.Component {
    render() {
        const l = this.props.locale
        return (
            <form>
                <FormGroup id="unique_name_tag" label={l.unique_name_tag_label} type="text" placeholder={l.unique_name_tag_placeholder} />
                <FormGroup id="password" label={l.password_label} type="password" placeholder={l.password_placeholder} />
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
