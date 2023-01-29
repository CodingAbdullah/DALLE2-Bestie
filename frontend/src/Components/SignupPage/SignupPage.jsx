import React, { useState } from 'react';
import Alert from '../Alert/Alert';
import axios from 'axios';
import validator from 'validator';
import { styles } from '../../css/SignupPageCSS';

const SignupPage = () => {
    const [email, updateEmailAddress] = useState('');
    const [password, updatePassword] = useState('');
    const [firstName, updateFirstName] = useState('');
    const [lastName, updateLastName] = useState('');
    const [setSignupAlert, updateSignupAlert] = useState('');

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
            axios.post("http://localhost:5000/signup", options)
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
            <div style={styles['signup-page-jumbotron']} className="jumbotron">
                <div className="container">
                    { setSignupAlert === '' ? null : <Alert type={ setSignupAlert } /> }
                    <form onSubmit={ signupHandler }>
                        <h2>Signup</h2>
                        <p>Enter in signup details to proceed</p>
                        <label style={styles['first-signup-label']}>First Name </label>
                        <input style={styles['signup-input']}type="text" className="form-control" onChange={e => updateFirstName(e.target.value)} />
                        <label style={styles['signup-label']}>Last Name </label>
                        <input style={styles['signup-input']} type="text" className="form-control" onChange={e => updateLastName(e.target.value)} />
                        <label style={styles['signup-label']}>Email Address </label>
                        <input style={styles['signup-input']} type="email" className="form-control" onChange={e => updateEmailAddress(e.target.value)} />
                        <label style={styles['signup-label']}>Password </label>
                        <input style={styles['signup-input']} type="password" className="form-control" onChange={e => updatePassword(e.target.value)} />
                        <button style={styles['signup-button']} type="submit" class='btn btn-primary'>Signup</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;