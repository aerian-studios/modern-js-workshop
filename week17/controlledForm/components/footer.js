import React from "react";

const Footer = ({ errorMessages, validationMessages, isDisabled, labelState1, labelState2 }) =>
    <footer className="footer">
        { validationMessages.length > 0 && validationMessages.map(
            (message, index) => <span key={ `validationMessages ${ index }` } className="footer__error">{ message }</span>
        )}
        { errorMessages && <span className="footer__error">{ errorMessages }</span> }
        <button disabled={ isDisabled } className="footer__button" type="submit">
            { labelState2 ? labelState2 : labelState1  }
        </button>
    </footer>

export default Footer;