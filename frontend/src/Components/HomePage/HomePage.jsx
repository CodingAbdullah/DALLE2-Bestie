import React, { useState } from 'react';

const HomePage = () => {
    const [imageRequest, updateImageRequest] = useState('');

    const formHandler = () => {

    }

    return (
        <div className="home-page">
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    <form onSubmit={ formHandler }>
                        <p>Enter a sentence describing the image you are looking for: </p>
                        <input type="text" onChange={e => updateImageRequest(e.target.value)} /><br />
                        <button style={{ marginTop: '2rem', display: 'inline' }} class='btn btn-primary'>Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomePage;