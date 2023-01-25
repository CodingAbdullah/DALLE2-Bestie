import React, { useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';
import validator from 'validator';

const ForgotPasswordPage = () => {
    const [email, updateEmailAddress] = useState('');
    const [resetPassword, updateResetPassword] = useState('');
    const [setForgotPasswordAlert, updateForgotPasswordAlert] = useState('');
    const [isVerified, updateVerification] = useState(false);
    const [verificationCode, updateVerificationCode] = useState('');
    const [isCodeCreated, updateCodeCreated] = useState(false);

    const forgotPasswordHandler = (e) => {
        e.preventDefault(); // Prevent premature refreshing upon submit

        if (validator.isEmail(email)) {
            // Split on @ of the address and take the second element for comparison
            if (email.split("@")[1].trim() !== 'gmail.com'){
                updateForgotPasswordAlert('forgot-password-gmail-requirement');
                updateVerification(false);
            }
            else {
                let body = JSON.stringify({
                    email
                });

                let options = {
                    method: 'POST',
                    body,
                    headers: {
                        'content-type' : 'application/json'
                    }
                }

                // If email is valid, prepare to verify using database, if so proceed to update and reset password, if not throw alert
                axios.post("http://localhost:5000/user-lookup", options)
                .then(response => {
                    if (response.status === 200 && response.data.doesExist){
                        updateForgotPasswordAlert('');
                        updateVerification(true);

                        // Once verified, add token to database
                        axios.post("http://localhost:5000/add-email-token", options)
                        .then(() => {
                            updateCodeCreated(true);
                            updateForgotPasswordAlert('retrieved-email'); // Verification code sent, display verify panel
                        })
                        .catch(() => {
                            updateForgotPasswordAlert('forgot-password-external-error');
                        });
                    }
                    else {
                        updateForgotPasswordAlert('forgot-password');
                        updateVerification(false);
                    }
                })
                .catch(() => {
                    updateForgotPasswordAlert('forgot-password-external-error');
                    updateVerification(false);
                });
            }
        }
        else {
            updateForgotPasswordAlert('forgot-password');
            updateVerification(false);
        }
    }

    const resetPasswordHandler = (e) => {
        e.preventDefault();

        let body = JSON.stringify({
            email,
            token: verificationCode
        });

        let options = {
            method: 'POST',
            body,
            headers : {
                'content-type' : 'application/json'
            }
        };

        // Verify token along with email address
        axios.post('http://localhost:5000/verify-token', options)
        .then(response => {
            if (response.status === 200 && response.data.verified) {
                // Reset password with new body, options, and axios call
                let body = {
                    email,
                    password: resetPassword
                };

                let options = {
                    method: 'POST',
                    body,
                    headers : {
                        'content-type' : 'application/json'
                    }
                };

                axios.post('http://localhost:5000/reset-password', options)
                .then(() => {
                    updateForgotPasswordAlert('forgot-password-reset-success'); // Password reset, notify user
                })
                .catch(() => {
                    updateForgotPasswordAlert('forgot-password-external-error');
                });
            }
            else {
                updateForgotPasswordAlert('forgot-password-expired-token'); // Expired token caught

            }
        })
        .catch(() => {
            updateForgotPasswordAlert('forgot-password-external-error'); // External error spotted
        });
    }

    return (
        <div className='forgot-password-page'>
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    { setForgotPasswordAlert === '' ? <Alert type={ setForgotPasswordAlert } /> : null }
                    <form onSubmit={ forgotPasswordHandler }>
                        <h2>Password Reset</h2>
                        <p>Enter in the email address below for password reset</p>
                        <p>Please note: Only gmail addresses are supported at the moment</p>
                        <label style={{ marginTop: '2rem' }}>Email Address </label>
                        { 
                            isVerified ? 
                                <input style={{ marginLeft: '25%', width: '50%' }} type="email" disabled className="form-control" /> : 
                                <input style={{ marginLeft: '25%', width: '50%' }} type="email" className="form-control" onChange={ e => updateEmailAddress(e.target.value)} /> 
                        } 
                        <button style={{ display: 'inline', marginTop: '1rem' }} className='btn btn-primary'>Request Verification Code</button>
                    </form>
                    { 
                        isVerified && isCodeCreated ? 
                            <form onSubmit={ resetPasswordHandler }>
                                <h2>Enter Verification Code</h2>
                                <p>Enter in the verification code and new password to proceed with reset</p>
                                <label style={{ marginTop: '2rem' }}>Verification Code</label>
                                <input style={{ marginLeft: '25%', width: '50%' }} type="text" className='form-control' required onChange={ e => updateVerificationCode(e.target.value) } />
                                <label style={{ marginTop: '2rem' }}>New Password</label>
                                <input style={{ marginLeft: '25%', width: '50%' }} type="password" className='form-control' required onChange={ e => updateResetPassword(e.target.value) } />
                                <button type="submit" className="btn btn-success">Reset Password</button>
                            </form>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;