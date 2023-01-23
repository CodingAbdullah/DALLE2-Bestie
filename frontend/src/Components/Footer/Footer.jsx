import React from 'react';
import './Footer.css'

const Footer = () => {
    
    const statement = "Copyright "  + new Date().getFullYear() + ". Powered By ";

    return (
        <div className="footer footer-container container">
            <footer>
                <p className="copyright-paragraph">{ statement }
                    <a style={{ color: 'black' }} href="https://reactjs.org/" target="_blank" rel="noreferrer">
                        <span style={{ marginRight: '0.5rem' }}>React</span></a>
                            and
                    <a style={{ marginLeft: '0.5rem', color: 'black' }} href="https://redux.js.org/" target="_blank" rel="noreferrer">Redux</a>
                    <img className="react-logo" src={require("../../assets/images/react.svg").default} alt="logo" />
                    <img style={{ marginBottom: '0.1rem' }} className="redux-logo" src={require("../../assets/images/redux.svg").default} alt="logo" />
                </p>
            </footer>
        </div>
    )
}

export default Footer;