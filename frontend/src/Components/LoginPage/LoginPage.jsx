import React, { useState, useEffect } from 'react';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducer/authReducer';

const LoginPage = () => {
    const [email, updateEmailAddress] = useState('');
    const [password, updatePassword] = useState('');
    const [setLoginAlert, updateLoginAlert] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userSelector = useSelector(state => state.auth.user);
    const errorSelector = useSelector(state => state.auth.error);
    const loadingSelector = useSelector(state => state.auth.isLoading);
    const successSelector = useSelector(state => state.auth.isSuccess);
    const tokenSelector = useSelector(state => state.auth.token);

    // Return to home page if user has already logged in
    useEffect(() => {
        if (userSelector !== null) {
            navigate('/');
        }
    }, [userSelector, loadingSelector, tokenSelector, successSelector, errorSelector, navigate]);

    const loginHandler = async (e) => {
        e.preventDefault();

        // Dispatch login action using redux
        dispatch(login({ email, password }));

        if (errorSelector !== null) {
            updateLoginAlert('login-external-error');
        }
        else if (userSelector === null && successSelector && tokenSelector === null){
            updateLoginAlert('login-user-password-incorrect');
        }
    }

    if (loadingSelector) {
        return <div>Loading...</div>
    }
    else if (successSelector && userSelector !== null){
        navigate("/");
    }
    else {
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
}

export default LoginPage;