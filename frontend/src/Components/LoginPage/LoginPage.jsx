import React, { useState } from 'react';

const LoginPage = () => {
    const [emailAddress, updateEmailAddress] = useState('');
    const [password, updatePassword] = useState('');

    const loginHandler = () => {

    }

    return (
        <div className='login-page'>
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    <form onSubmit={ loginHandler }>
                        <h2>Login</h2>
                        <p>Enter in credentials to proceed</p>
                        <label>Email Address </label>
                        <input style={{ marginLeft: '25%', width: '50%' }} type="email" className="form-control" onChange={e => updateEmailAddress(e.target.value)} /><br />
                        <label>Password </label>
                        <input style={{ marginLeft: '25%', width: '50%' }} type="password" className="form-control" onChange={e => updatePassword(e.target.value)} /><br />
                        <button style={{ display: 'inline' }} class='btn btn-primary'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;