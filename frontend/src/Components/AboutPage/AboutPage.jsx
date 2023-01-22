import React from 'react';

const AboutPage = () => {

    return (
        <div className='about-page'>
            <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem', backgroundColor: '#EAFCFC' }} className="jumbotron">
                <div className="container">
                    <h2>About</h2>
                    <p>Developer Information</p>
                    <p style={{ marginTop: '2rem' }}>If you are interested in learning more about the developer behind this project, you can visit their bio here:
                        <a style={{ color: 'black' }} href="https://kingabdul.eth.xyz/" target="_blank" rel="noreferrer"> <b>About The Developer</b></a>
                    </p>
                </div>
            </div>  
        </div>
    )
}

export default AboutPage;