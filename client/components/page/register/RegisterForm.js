import React from 'react'
import { connect } from 'react-redux'

import FormGroup from '../../share/FormGroup'

class RegisterForm extends React.Component {


    // description VARCHAR(512),
    // avatar LONGBLOB,
    render() {
        const locale = this.props.locale
        return (
            <form>
                <FormGroup id="unique_name_tag" label={locale.unique_name_tag_label} type="text" placeholder={locale.unique_name_tag_placeholder} />
                <FormGroup id="email" label={locale.email_label} type="email" placeholder={locale.email_placeholder} />
                <FormGroup id="password" label={locale.password_label} type="password" placeholder={locale.password_placeholder} />
                <FormGroup id="repeat-password" label={locale.repeat_password_label} type="password" placeholder={locale.repeat_password_placeholder} />
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
