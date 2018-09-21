import React, { Component } from "react";
import "../styles.css";

export class App extends Component {

    constructor (props) {
        super(props);
        this.fields = {};
    }

    gatherData () {
        const fieldValues = (Object.values(this.fields));
        return fieldValues.map((field) => field.value)
    }

    handleSubmit = (e) => {
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
                    ref={ (e) => this.fields[filedId] = e } />
            </div>
        )
    }

    renderFooter() {
        return (
            <footer className="footer">
                <button className="footer__button" type="submit">Submit</button>
            </footer>
        )
    }

    render() {
        return (
            <div className="container">
                <form className="form" onSubmit={ this.handleSubmit }>
                    <h1 className="form__header">Would you like to know more?</h1>
                    <fieldset className="form_fieldset">
                        { this.renderField("Username", "username") }
                        { this.renderField("Email", "email") }
                        { this.renderField("Password", "password1") }
                    </fieldset>
                    { this.renderFooter() }
                </form>
            </div>
        );
    }
}
