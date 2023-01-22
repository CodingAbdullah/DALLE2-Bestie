import React from 'react';

const Alert = (props) => {
    const { type } = props;

    let msg = '';
    let alertType = '';

    switch ( type ) {
        case "login":
            msg = 'Invalid login! Please enter valid credentials or signup.';
            alertType = 'warning';
            break;
        case "signup":
            msg = 'Invalid signup! Please enter valid credentials.'
            alertType = 'warning';
            break;
        case "forgotPassword":
            msg = "No such email exists, please enter a valid email address for password reset.";
            alertType = 'warning';
            break;
        case "retrievedEmail":
            msg = "A verified code has been sent to this email, please enter below to proceed";
            alertType = 'primary';
            break;
        default:
            break;
    }

    return (
        <div className='alert'>
            <div class={`alert alert-${alertType}`} role="alert">
                { msg }
            </div>
        </div>
    )
}

export default Alert;