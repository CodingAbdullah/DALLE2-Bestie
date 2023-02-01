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
                    <div className="bg-dark col-sm-12 col-md-12 col-lg-6">
                        <div className='d-flex-col text-white px-3 py-5'>
                                <h2 style={ styles.open_ai_heading }>Open AI</h2>
                                <p><a style={ styles.open_ai_link } href="https://openai.com/dall-e-2/">THE MOST AWESOME AI Imaging TOOL</a></p>
                                <p>From the site itself... ;)</p>
                                <p style={ styles.open_ai_paragraph }>"DALL·E 2 can create original, realistic images and art from a
                                text description. It can combine concepts, attributes, and styles."</p>
                                <p style={ styles.open_ai_paragraph }>"DALL·E 2 has learned the relationship between images and the text used to describe them. 
                                It uses a process called “diffusion,” which starts with a pattern of random dots and gradually alters that pattern towards an image when it recognizes specific aspects of that image."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;