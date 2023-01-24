import React, { useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';
import validator from 'validator';

const ForgotPasswordPage = () => {
    const [email, updateEmailAddress] = useState('');
    const [setForgotPasswordAlert, updateForgotPasswordAlert] = useState('');

    const forgotPasswordHandler = () => {
        if (validator.isEmail(email)){
            const body = JSON.stringify({
                email
            });

            const options = {
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
                }
                else {
                    updateForgotPasswordAlert('forgot-password');
                }
            })
            .catch(() => {
                updateForgotPasswordAlert('');
            });
        }
        else {
            updateForgotPasswordAlert('forgot-password');
        }
    }

    return (
        <div className='forgot-password-page'>
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    { setForgotPasswordAlert === '' ? <Alert type={ setForgotPasswordAlert } /> : null }
                    <form onSubmit={ forgotPasswordHandler }>
                        <h2>Password Reset</h2>
                        <p>Enter in the email address below for password reset</p>
                        <label style={{ marginTop: '2rem' }}>Email Address </label>
                        <input style={{ marginLeft: '25%', width: '50%' }} type="email" className="form-control" onChange={e => updateEmailAddress(e.target.value)} />
                        <button style={{ display: 'inline', marginTop: '1rem' }} className='btn btn-primary'>Reset Password</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordPage;