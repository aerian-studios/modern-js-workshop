import React, { Component } from "react";
import _ from 'lodash';
import "./styles.css";

export class App extends Component {

    constructor (props) {
        super(props);
        this.fields = {};

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    gatherData () {
        return _.mapValues(this.fields, 'value');
    }

    handleSubmit (e) {
        e.preventDefault();
        console.table(this.gatherData());
    }

    renderField(filedText, filedId) {
        return (
            <div className="field">
                <label className="field__label" htmlFor={ filedId }>{ filedText }</label>
                <input 
                    id ={ filedId } 
                    required 
                    type="text"
                    maxLength="50"
                    className="field__input field__input--text"
                    ref={ (e) => this.fields.postcode = e } />
            </div>
        )
    }

    renderFooter() {
        return (
            <footer className="footer">
                <span className="footer__error">Passwords do not match</span>
                <button className="footer__button" disabled type="submit">Submit</button>
            </footer>
        )
    }

    render() {
        return (
            <div className="conatiner">
                <form id="form" className="form" onSubmit={this.handleSubmit}>
                    <h1 className="form__header">Would you like to know more?</h1>
                    <fieldset className="form_fieldset">
                        { this.renderField("Username", "username") }
                        { this.renderField("Email", "email") }
                        { this.renderField("Password", "password1") }
                        { this.renderField("Please confirm password", "password2") }
                    </fieldset>
                    { this.renderFooter() }
                </form>
            </div>
        );
    }
}
