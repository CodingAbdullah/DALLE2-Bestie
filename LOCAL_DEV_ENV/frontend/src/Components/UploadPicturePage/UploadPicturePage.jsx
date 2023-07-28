import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { styles } from '../../css/SignupPageCSS';
import axios from 'axios';

const UploadPicturePage = () => {
    const [fileState, uploadFile] = useState({
        fileInformation: null
    });

    // Hooks to be used to gather information for navigating and checking global state
    const userSelector = useSelector(state => state.auth.user);
    const navigate = useNavigate();

    // If token does not exist, redirect to home
    useEffect(() => {
        if (userSelector.token === null) {
            navigate("/");
        }
    }, []);

    // File handler function for updating file state
    const fileHandler = (e) => {
        uploadFile(prevState => { 
            return { 
                ...prevState, 
                fileInformation: e.target.files[0] 
            } 
        });
    }

    const uploadHandler = () => {
        // Append file data to object
        const formData = new FormData();
        formData.append('file', fileState.fileInformation, fileState.fileInformation.name);

        // Protected route must be accessed via protected way, access global state store and pass in the user
        let config = {
            headers : {
                'Authorization' : 'Bearer ' + userSelector.token
            }
        }
        
        // Uploading picture using back-end endpoint
        axios.post('http://localhost:5001/upload-picture', formData, config)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className='signup-page'>
            <div style={ styles['signup-page-jumbotron'] } className="container">
                 <div className="row">
                    <div className="bg-dark col-sm-12 col-md-12 col-lg-6">
                        <div className='d-flex-col text-white px-3 py-5'>
                            <h2 style={ styles['signup'] }>Upload Image</h2>
                            <p style={ styles['signup-description'] }>Select a picture that you'd like to upload and save to your account</p>
                            <div className="mb-3">
                                <label className="form-label">Select file to upload: </label>
                                <input className="form-control" type="file" name="file" accept='image/png, image/jpeg' onChange={ e => fileHandler(e) } />
                            </div>
                            <button style={ styles['signup-button'] } type="button" onClick={ uploadHandler } className='btn btn-primary'>Upload Picture</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UploadPicturePage;