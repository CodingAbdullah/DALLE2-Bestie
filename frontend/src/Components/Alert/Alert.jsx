import React from 'react';

const Alert = (props) => {
    const { type } = props;

    let msg = '';
    let alertType = '';

    switch ( type ) {
        case "login-user-does-not-exist":
            msg = 'Invalid login! User does not exist.';
            alertType = 'danger';
            break;
        case "login-password-incorrect":
            msg = "Invalid login! Invalid password.";
            alertType = 'danger';
            break;
        case "login-external-error":
            msg = "Invalid login, but not due to credentials, an external error was found"
            alertType = 'warning';
            break;
        case "login-success":
            msg = "Login successful!"
            alertType = 'success';
            break;
        case "signup-user-exists":
            msg = 'Invalid signup! An account with this email has already been registered!'
            alertType = 'danger';
            break;
        case "signup-user-success":
            msg = "User successfully registered! Login to continue"
            alertType = "success";
            break;
        case "signup-external-error":
            msg = "User cannot be signed up right now, external error";
            alertType = "warning";
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