import React from 'react';

const Alert = (props) => {
    const { type } = props;

    let msg = '';
    let alertType = '';

    switch ( type ) {
        case "login-user-password-incorrect":
            msg = "Invalid login! Invalid credentials";
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
        case "signup-incorrect":
            msg = "Invalid email address, please enter a valid one"
            alertType = "danger";
            break;
        case "forgot-password":
            msg = "No registered email exists, please enter a valid email address for password reset";
            alertType = 'danger';
            break;
        case "forgot-password-gmail-requirement":
            msg = "Only Gmail addresses supported for password resets at the moment";
            alertType = "warning";
            break;
        case "forgot-password-external-error":
            msg = "Password cannot be reset right now";
            alertType = 'warning';
            break;
        case "forgot-password-expired-token":
            msg = "Verification code is not valid or it has expired";
            alertType = 'danger';
            break;
        case "retrieved-email":
            msg = "A verified code has been sent to this email, please enter below to proceed";
            alertType = 'primary';
            break;
        case "forgot-password-reset-success":
            msg = "Password to this associated email has been successfully updated!";
            alertType = 'success';
            break;
        case "picture-save-success":
            msg = "Picture saved to database!";
            alertType = 'success';
            break;
        case "picture-save-alert":
            msg = "Picture was NOT saved to database!";
            alertType = 'danger';
            break;
        case "fetch-pictures-empty":
            msg = "No pictures are saved under you name! Search n Save ;)"
            alertType = 'warning';
            break;
        default:
            break;
    }

    return (
        <div className='alert'>
            <div className={`alert alert-${alertType}`} role="alert">
                { msg }
            </div>
        </div>
    )
}

export default Alert;