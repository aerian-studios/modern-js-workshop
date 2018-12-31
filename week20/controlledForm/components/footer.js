import React from "react";

const Footer = ({ errorMessages, validationMessages, isDisabled, buttonLabelState1, buttonLabelState2 }) =>
    <footer className="footer">
        { validationMessages.length > 0 && validationMessages.map(
            (message, index) => <div key={ `validation-messages-${ index }` } className="footer__error">{ message }</div>
        )}
        { errorMessages && <span className="footer__error">{ errorMessages }</span> }
        <button disabled={ isDisabled } className="footer__button" type="submit">
            { buttonLabelState2 ? buttonLabelState2 : buttonLabelState1  }
        </button>
    </footer>

export default Footer;