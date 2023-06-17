import React, { useState, useEffect } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';
import validator from 'validator';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { styles } from '../../css/SignupPageCSS';

const SignupPage = () => {
    const [email, updateEmailAddress] = useState('');
    const [password, updatePassword] = useState('');
    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [setSignupAlert, updateSignupAlert] = useState('');
    const userSelector = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect user if already logged in
        if (userSelector !== null) {
            navigate("/")
        }
    }, [userSelector, navigate])

    const signupHandler = (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            firstName,
            lastName,
            email,
            password
        });

        const options = {
            method: 'POST',
            body,
            headers: {
                'content-type' : 'application/json'
            }
        }
        
        // Client-side validation of email address entered, using third party library
        if (validator.isEmail(email)){
            axios.post("http://localhost:5001/signup", options)
            .then((response) => {
            
                if (response.status === 201) {
                    updateSignupAlert('signup-user-success');
                }
                else if (response.status === 200){
                    updateSignupAlert('signup-user-exists');
                }
            })
            .catch(() => {
                updateSignupAlert('signup-external-error');
            });
        }
        else {
            updateSignupAlert('signup-incorrect');
        }
    }

    return (
        <div className='signup-page'>
            <div style={styles['signup-page-jumbotron']} className="container">
                { setSignupAlert === '' ? null : <Alert type={ setSignupAlert } /> }
                <div className="row">
                    <div className="bg-dark col-sm-12 col-md-12 col-lg-6">
                        <div className='d-flex-col text-white px-3 py-5'>
                            <form onSubmit={ signupHandler }>
                                <h2 style={ styles['signup'] }>Signup</h2>
                                <p style={ styles['signup-description'] }>Enter in signup details to proceed</p>
                                <label style={ styles['first-signup-label'] }>First Name </label>
                                <input style={ styles['signup-input'] }type="text" className="form-control" onChange={ e => updateFirstName(e.target.value) } />
                                <label style={ styles['signup-label'] }>Last Name </label>
                                <input style={ styles['signup-input'] } type="text" className="form-control" onChange={ e => updateLastName(e.target.value) } />
                                <label style={ styles['signup-label'] }>Email Address </label>
                                <input style={ styles['signup-input'] } type="email" className="form-control" onChange={ e => updateEmailAddress(e.target.value) } />
                                <label style={ styles['signup-label'] }>Password </label>
                                <input style={ styles['signup-input'] } type="password" className="form-control" onChange={ e => updatePassword(e.target.value) } />
                                <button style={ styles['signup-button'] } type="submit" className='btn btn-primary'>Signup</button>
                            </form>
                        </div>
                    </div>
                    <div className="bg-dark col-sm-12 col-md-12 text-white col-lg-6 py-5">
                        <img className="pt-5" src={ require("../../assets/images/signup.png") } alt="No Text" height="350" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;