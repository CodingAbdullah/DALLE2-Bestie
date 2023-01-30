import React from 'react';
import { styles } from '../../css/AboutPageCSS';

const AboutPage = () => {

    return (
        <div className='about-page'>
            <div style={styles.jumbotron} className="container">
                <div className="row">
                    <div className="bg-dark col-sm-12 col-md-12 col-lg-6">
                        <div className='d-flex-col text-white px-3 py-5'>
                                <h2 style={ styles.about_heading }>About</h2>
                                <p style={ styles.developer_paragraph}>Developer Information</p>
                                <p style={ styles.about_paragraph }>If you are interested in learning more about the developer behind this project, you can visit their bio here:
                                    <a style={ styles.developer_link } href="https://kingabdul.eth.xyz/" target="_blank" rel="noreferrer"> <b>About The Developer</b></a>
                                </p>
                        </div>                    
                    </div>
                    <div className="bg-dark col-sm-12 col-md-12 text-white col-lg-6 py-3">
                        <img className="p-5" src={require("../../assets/images/about.png")} alt="No text" height="350" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;