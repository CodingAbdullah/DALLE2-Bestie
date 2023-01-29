import React from 'react';
import './Footer.css';
import { styles } from '../../css/FooterCSS';

const Footer = () => {
    
    const statement = "Copyright "  + new Date().getFullYear() + ". Powered By ";

    return (
        <div className="footer footer-container container">
            <footer>
                <p className="copyright-paragraph">{ statement }
                    <a style={styles['react-link']} href="https://reactjs.org/" target="_blank" rel="noreferrer">
                        <span style={styles['span-react']}>React</span></a>
                            and
                    <a style={styles['redux-link']} href="https://redux.js.org/" target="_blank" rel="noreferrer">Redux</a>
                    <img className="react-logo" style={styles['react-logo']} src={require("../../assets/images/react.svg").default} alt="logo" />
                    <img style={styles['redux-logo']} className="redux-logo" src={require("../../assets/images/redux.svg").default} alt="logo" />
                </p>
            </footer>
        </div>
    )
}

export default Footer;