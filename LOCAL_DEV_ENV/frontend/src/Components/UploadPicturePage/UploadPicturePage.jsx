import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { styles } from '../../css/SignupPageCSS';
import axios from 'axios';
import Alert from '../Alert/Alert';

const UploadPicturePage = () => {
    const [fileState, uploadFile] = useState(null);
    const [fileSize, updateFileSize] = useState('small');
    const [fileTitle, updateFileTitle] = useState('');
    const [fileCheck, updateFileCheck] = useState(false);
    const [alert, updateAlert] = useState('');

    // Hooks to be used to gather information for navigating and checking global state
    const userSelector = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    // If token does not exist, redirect to home
    useEffect(() => {
        if (userSelector.token === null) {
            navigate("/");
        }
    }, []);

    const uploadHandler = (e) => {
        e.preventDefault();

        // Append file data to object
        let formData = new FormData();
        formData.append('picture', fileState);

        // Protected route must be accessed via protected way, access global state store and pass in the user
        let options = {
            method: 'POST',
            headers : {
                'Authorization' : 'Bearer ' + userSelector.token,
                'Header-File-Size' : fileSize,
                'Header-File-Title' : fileTitle
            }
        }
        
        // Uploading picture using form data
        axios.post('http://localhost:5001/upload-picture', formData, options)
        .then(() => {
            updateFileCheck(true); // Update file checks
            updateAlert('upload-success');
        })
        .catch(() => {
            updateFileCheck(true);
            updateAlert('upload-error');
        });
    }

    return (
        <div className='signup-page'>
            <div style={ styles['signup-page-jumbotron'] } className="container">
                 <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} className="row">
                    <div className="bg-dark col-sm-12 col-md-12 col-lg-12">
                        <div className='d-flex-col text-white px-3 py-5'>
                            <h2 style={ styles['signup'] }>Upload Image</h2>
                            <p style={ styles['signup-description'] }>Select a picture that you would like to upload and save to your account</p>
                            { alert ? <Alert type={ alert } /> : null }
                            <form onSubmit={ uploadHandler }>
                                <div className="mb-3">
                                    <label className="form-label">File Name: </label>
                                    <input className="form-control" type="text" name="image-name" onChange={ e => updateFileTitle(e.target.value) } required/>
                                </div>
                                <label style={{ marginTop: '0.5rem' }} className="form-label">Picture Size Option: </label>
                                <select className="form-select" onChange={ e => updateFileSize(e.target.value) }>
                                    <option name="size" value="small">Small</option>
                                    <option name="size" value="medium">Medium</option>
                                    <option name="size" value="large">Large</option>
                                </select>
                                <div className="mb-3">
                                    <label style={{ marginTop: '1.5rem' }} className="form-label">Select file to upload: </label>
                                    <input className="form-control" type="file" name="picture" accept='image/png, image/jpeg' onChange={ e => uploadFile(e.target.files[0]) } required />
                                </div>
                                <button style={ styles['signup-button'] } type="submit" disabled={ fileCheck ? true: false } className='btn btn-primary'>Upload Picture</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UploadPicturePage;