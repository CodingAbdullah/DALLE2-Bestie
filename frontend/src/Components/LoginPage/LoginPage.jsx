import React, { useState } from 'react';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducer/authReducer';
import axios from 'axios';

const LoginPage = () => {
    const [email, updateEmailAddress] = useState('');
    const [password, updatePassword] = useState('');
    const [setLoginAlert, updateLoginAlert] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginHandler = async (e) => {
        e.preventDefault();

        // Redux implementation
        dispatch(login(email, password));
        
        /*
        const options = {
            method: 'POST',
            body,
            headers : {
                'content-type' : 'application.json'
            }
        };

        axios.post('http://localhost:5000/login', options)
        .then(response => {
            if (response.status === 200 && response.data.userExist === true && response.data.password === false){
                updateLoginAlert('login-password-incorrect');
            }
            else if (response.status === 200 && response.data.userExist === false && response.data.password === false) {
                updateLoginAlert('login-user-does-not-exist');
            }
            else if (response.status === 200 && response.data.userExist === true && response.data.password === true) {
                updateLoginAlert('login-success');
            }
            // Set redux functions here later, test alerts for now
        })
        .catch(() => {
            updateLoginAlert('login-external-error');
        });
        */
    }

    return (
        <div className='login-page'>
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    { setLoginAlert === '' ? null : <Alert type={ setLoginAlert } />  }
                    <form onSubmit={ loginHandler }>
                        <h2>Login</h2>
                        <p>Enter in credentials to proceed</p>
                        <label style={{ marginTop: '2rem' }}>Email Address </label>
                        <input style={{ marginLeft: '25%', width: '50%' }} type="email" className="form-control" onChange={e => updateEmailAddress(e.target.value)} />
                        <label style={{ marginTop: '1.5rem' }}>Password </label>
                        <input style={{ marginLeft: '25%', width: '50%' }} type="password" className="form-control" onChange={e => updatePassword(e.target.value)} />
                        <a href="/forgot-password">Forgot Password</a><br />
                        <button style={{ marginTop: '2rem', display: 'inline' }} className='btn btn-primary'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;