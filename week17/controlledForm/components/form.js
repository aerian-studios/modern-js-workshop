import React, { Component } from "react";
import FormFieldSet from "./formFieldSet";
import Footer from "./footer";
import _ from "lodash";

class Form extends Component {

    constructor(props) {
        super(props);
        this.fields = {};
    }

    gatherData() {
        return _.mapValues(this.fields, 'value');
    }

    handleSubmit(e) {
        e.preventDefault();
        console.table(this.gatherData());
    }

    returnFieldData () {

    }

    render() {
        return (
            <div className="conatiner">
                <form className="form" onSubmit={(e) => {
                    this.handleSubmit(e)
                }}>
                    <h1 className="form__header">Would you like to know more?</h1>
                    <fieldset className="form_fieldset">
                        <FormFieldSet filedText="Username" filedId="username" type="text" callBack={ this.returnFieldData } />
                        <FormFieldSet filedText="Email" filedId="email" type="text" callBack={ this.returnFieldData } />
                        <FormFieldSet filedText="Password" filedId="password1" type="text" callBack={ this.returnFieldData } />
                        <FormFieldSet filedText="Please confirm password" filedId="password2" type="text" callBack={ this.returnFieldData } />
                    </fieldset>
                    <Footer />
                </form>
            </div>
        );
    }
}

export default Form;