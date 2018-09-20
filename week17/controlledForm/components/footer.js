import React from "react";

const Footer = ({ errorMsg, validationMsg, isDisbaled }) =>
    <footer className="footer">
        { validationMsg && <span className="footer__error">{ validationMsg }</span> }
        { errorMsg && <span className="footer__error">{ errorMsg }</span> }
        <button disabled={ isDisbaled } className="footer__button" type="submit">Submit</button>
    </footer>

export default Footer;