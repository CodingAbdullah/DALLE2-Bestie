import React, { useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';
import validator from 'validator';
import { styles } from '../../css/ForgotPasswordPageCSS';

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
            // Split on @ of the address and take the second element for comparison to see if gmail domain
            if (email.split("@")[1].trim() !== 'gmail.com'){            
                let options = {
                    method : 'POST',
                    body: JSON.stringify({ email }),
                    headers : {
                        'content-type' : 'application/json'
                    }
                }

                // Make a backend API call to verify if address exists and notify only gmail accounts supported
                axios.post("http://localhost:5001/add-email-token", options)
                .then((response) => {
                    if (response.status === 200 && response.data.doesExist === false) {
                        updateCodeCreated(false);
                        updateVerification(false);
                        updateForgotPasswordAlert('forgot-password');
                    }
                    // If user does exist, tell user only gmail users supported at the moment
                    else {
                        updateForgotPasswordAlert('forgot-password-gmail-requirement');
                        updateVerification(false);
                        updateCodeCreated(false);
                    }
                })
                .catch(() => {
                    updateForgotPasswordAlert('forgot-password-external-error'); // Display error if any
                    updateVerification(false);
                    updateCodeCreated(false);
                });
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
                // Making a backend API call to verify if user exists and is a gmail
                axios.post("http://localhost:5001/add-email-token", options)
                .then((response) => {
                    if (response.status === 200 && response.data.doesExist === false) {
                        updateCodeCreated(false);
                        updateVerification(false);
                        updateForgotPasswordAlert('forgot-password');
                    }
                    // If user does exist, send code and open the verification code panel for new password entry
                    else {
                        updateForgotPasswordAlert('retrieved-email');
                        updateVerification(true);
                        updateCodeCreated(true);
                    }
                })
                .catch(() => {
                    updateForgotPasswordAlert('forgot-password-external-error'); // Display errors if any
                    updateVerification(false);
                    updateCodeCreated(false);
                });
            }
        }
        else {
            updateForgotPasswordAlert('forgot-password'); // Invalid email address, prompt user to enter a valid one
            updateVerification(false);
            updateCodeCreated(false);
        }
    }

    const resetPasswordHandler = (e) => {
        e.preventDefault();

        let body = JSON.stringify({
            email,
            token: verificationCode,
            password: resetPassword
        });

        let options = {
            method: 'POST',
            body,
            headers : {
                'content-type' : 'application/json'
            }
        };

        // Verify token along with email address
        axios.post('http://localhost:5001/verify-email-token', options)
        .then(response => {
            if (response.status === 200 && !response.data.verified) {
                updateForgotPasswordAlert('forgot-password-expired-token'); // Token is either expired or used did not enter the right one
            }
            else {
                updateForgotPasswordAlert('forgot-password-reset-success'); // Reset password with new one and updated header message
            }
        })
        .catch(() => {
            updateForgotPasswordAlert('forgot-password-external-error'); // External error spotted
        });
    }

    return (
        <div className='forgot-password-page'>
            <div style={ styles.jumbotron } className="container">
                { setForgotPasswordAlert === '' ? null : <Alert type={ setForgotPasswordAlert } /> }
                <div className="row p-6">
                    <div className="bg-dark col-sm-12 col-md-12 col-lg-6">
                        <div className='d-flex-col text-white px-3 py-5'>
                        <form onSubmit={ forgotPasswordHandler }>
                                    <h2 style={ styles.reset_heading }>Password Reset</h2>
                                    <p style={ styles.reset_paragraph }>Enter in the email address below for password reset. <br/> Please note: Only <b>GMail</b> addresses are supported at the moment</p>
                                    <label style={styles['email-address-label']}>Email Address </label>
                                    { 
                                        isVerified ? 
                                            <>
                                                <input style={styles['email-input']} type="email" disabled className="form-control" /> 
                                            </> :
                                            <>
                                                <input style={styles['email-input']} type="email" onChange={ e => updateEmailAddress(e.target.value) } className="form-control" /> 
                                                <button style={styles['email-verification-button']} className='btn btn-primary'>Request Verification Code</button>
                                            </>
                                    } 
                                </form>
                                <section style={ styles['verify-token-section'] } >
                                    { 
                                        isVerified && isCodeCreated ? 
                                            <form onSubmit={ resetPasswordHandler }>
                                                <h2 style={ styles.reset_heading }>Enter Verification Code</h2>
                                                <p style={ styles.reset_paragraph }>Enter in the verification code and new password to proceed with reset</p>
                                                {
                                                    setForgotPasswordAlert === 'forgot-password-reset-success' ?
                                                        <>
                                                            <label style={styles['verification-code-label']}>Verification Code</label>
                                                            <input style={styles['verification-code-input']} type="text" className='form-control' disabled />
                                                            <label style={styles['new-password-label']}>New Password</label>
                                                            <input style={styles['new-password-input']} type="password" className='form-control' disabled />
                                                            <button style={styles['new-password-submit-button']} type="submit" disabled className="btn btn-success">Reset Password</button>
                                                        </>
                                                    :
                                                        <> 
                                                            <label style={styles['verification-code-label']}>Verification Code</label>
                                                            <input style={styles['verification-code-input']} type="text" className='form-control' required onChange={ e => updateVerificationCode(e.target.value) } />
                                                            <label style={styles['new-password-label']}>New Password</label>
                                                            <input style={styles['new-password-input']} type="password" className='form-control' required onChange={ e => updateResetPassword(e.target.value) } />
                                                            <button style={styles['new-password-submit-button']} type="submit" className="btn btn-success">Reset Password</button>
                                                        </>
                                                }
                                            </form>
                                        : null
                                    }
                                </section>
                        </div>
                    </div>
                    <div className="bg-dark col-sm-12 col-md-12 text-white col-lg-6 py-5">
                        <img className="mr-5" src={ require("../../assets/images/fp.png") } alt="No Text" height="350" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;