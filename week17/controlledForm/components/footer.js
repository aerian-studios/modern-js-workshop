import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <span className="footer__error">Passwords do not match</span>
                <button className="footer__button" type="submit">Submit</button>
            </footer>
        )
    }
}

export default Footer;