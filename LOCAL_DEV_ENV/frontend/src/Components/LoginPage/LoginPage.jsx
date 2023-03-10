import React, { useState, useEffect } from 'react';
import Alert from '../Alert/Alert';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/reducer/authReducer';
import { styles } from '../../css/LoginPageCSS';

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

        if (userSelector === null && successSelector && tokenSelector === null){
            updateLoginAlert('login-external-error-or-incorrect');
        }
        else if (errorSelector !== null) {
            updateLoginAlert('login-external-error-or-incorrect');
        }
    }

    if (loadingSelector) {
        return <div>Loading...</div>
    }
    else if (successSelector && userSelector !== null && tokenSelector !== null){
        navigate("/");
    }
    else {
        return (
            <div className='login-page'>
                <div style={ styles.jumbotron } className="container">
                { setLoginAlert === '' ? null : <Alert type={ setLoginAlert } />  }
                    <div className="row">
                        <div className="bg-dark col-sm-12 col-md-12 col-lg-6">
                            <div className='d-flex-col text-white px-3 py-5'>
                                <form onSubmit={ loginHandler }>
                                    <h2 style={ styles.login_heading }>Login</h2>
                                    <p style={ styles.label }>Enter in credentials to proceed</p>
                                    <label style={ styles['email-address-label'] }>Email Address </label>
                                    <input style={ styles['email-address-input'] } type="email" className="form-control" onChange={ e => updateEmailAddress(e.target.value) } />
                                    <label style={ styles['password-label'] }>Password </label>
                                    <input style={ styles['password-input'] } type="password" className="form-control" onChange={ e => updatePassword(e.target.value) } />
                                    <a style={ styles.password_link } href="/forgot-password">Forgot Password</a><br />
                                    <button style={ styles['login-button'] } className='btn btn-primary'>Login</button>
                                </form>
                            </div>                    
                        </div>
                        <div className="bg-dark col-sm-12 col-md-12 text-white col-lg-6 py-5">
                            <img className="p-5" src={ require("../../assets/images/login.png") } alt="No Text" height="350" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginPage;