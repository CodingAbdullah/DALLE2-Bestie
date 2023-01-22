import React from 'react';
import './Footer.css'

const Footer = () => {
    
    const statement = "Copyright "  + new Date().getFullYear() + ". Powered By ";

    return (
        <div className="footer footer-container container">
            <footer>
                <p className="copyright-paragraph">{ statement } <a style={{ color: 'black' }} href="https://reactjs.org/">React</a><img className="react-logo" src={require("../../assets/images/logo.svg").default} alt="logo" /></p>
            </footer>
        </div>
    )
}

export default Footer;