import React, { useState } from 'react';
import Alert from '../Alert/Alert';

const ForgotPasswordPage = () => {
    const [emailAddress, updateEmailAddress] = useState('');
    const [setForgotPasswordAlert, updateForgotPasswordAlert] = useState(false);

    const forgotPasswordHandler = () => {

    }


    return (
        <div className='forgot-password-page'>
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    { setForgotPasswordAlert === true ? <Alert type='forgotPassword' /> : null }
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