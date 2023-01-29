import React from 'react';
import { styles } from '../../css/AboutPageCSS';

const AboutPage = () => {

    return (
        <div className='about-page'>
            <div style={ styles.jumbotron } className="jumbotron">
                <div className="container">
                    <h2>About</h2>
                    <p>Developer Information</p>
                    <p style={ styles.about_paragraph }>If you are interested in learning more about the developer behind this project, you can visit their bio here:
                        <a style={ styles.developer_link } href="https://kingabdul.eth.xyz/" target="_blank" rel="noreferrer"> <b>About The Developer</b></a>
                    </p>
                </div>
            </div>  
        </div>
    )
}

export default AboutPage;