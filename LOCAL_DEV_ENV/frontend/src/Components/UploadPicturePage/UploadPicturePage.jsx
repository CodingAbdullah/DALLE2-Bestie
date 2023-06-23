import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { styles } from '../../css/SignupPageCSS';

const UploadPicturePage = () => {
    const [fileState, uploadFile] = useState(null);
    const userSelector = useSelector(state => state.auth.user);

    const uploadHandler = (e) => {
        e.preventDefault();

        // Protected route must be accessed via protected way, access global state store and pass in the user, JWT token values
        let options = {
            method: 'POST',
            body: JSON.stringify({ file: fileState, email: useSelector.user.email }),
            headers : {
                'content-type' : 'application/json',
                'Authorization' : 'Bearer ' + userSelector.token
            }
        }

        axios.post('http://localhost:5001/upload-picture', options)
        .then(response => {
            
        })
        .catch(err => {

        });
    }

    return (
        <div className='signup-page'>
            <div style={ styles['signup-page-jumbotron'] } className="container">
                 <div className="row">
                    <div className="bg-dark col-sm-12 col-md-12 col-lg-6">
                        <div className='d-flex-col text-white px-3 py-5'>
                            <form onSubmit={ uploadHandler }>
                                <h2 style={ styles['signup'] }>Upload Image</h2>
                                <p style={ styles['signup-description'] }>Select a picture that you'd like to upload and save to your account</p>
                                <div className="mb-3">
                                    <label className="form-label">Select file to upload: </label>
                                    <input className="form-control" type="file" onClick={ e => uploadFile(e.target.files[0]) } />
                                </div>
                                <button style={ styles['signup-button'] } type="submit" className='btn btn-primary'>Upload Picture</button>
                            </form>                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UploadPicturePage;