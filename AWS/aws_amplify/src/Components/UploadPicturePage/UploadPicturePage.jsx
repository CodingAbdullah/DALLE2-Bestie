import React from 'react';
import { styles } from '../../css/SignupPageCSS';

const UploadPicturePage = () => {

    // Code will go here...
    const uploadHandler = (e) => {

    }

    return (
        <div className="upload-picture-page">
            <div style={styles['signup-page-jumbotron']} className="container">
                    <div className="row p-6">
                        <div className="bg-dark col-sm-12 col-md-12 col-lg-6">
                            <div className='d-flex-col text-white px-3 py-5'>
                                <form onSubmit={ uploadHandler }>
                                    <h2 style={ styles['signup'] }>Upload Image</h2>
                                    <p style={ styles['signup-description'] }>Select a picture that you'd like to upload and save to your account</p>
                                    <div class="mb-3">
                                        <label for="formFile" class="form-label">Select file to upload: </label>
                                        <input class="form-control" type="file" />
                                    </div>
                                </form>                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}


export default UploadPicturePage;