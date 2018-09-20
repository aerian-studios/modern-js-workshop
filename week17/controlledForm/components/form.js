import React, { Component } from "react";
import FormField from "./formField";
import Footer from "./footer";
import FormSelect from "./formSelect";
import _ from 'lodash';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                title: "Mr",
                username: "",
                email: "",
                password1: "",
                password2: "",
            },
            buttonEnabled: false,
            formSubmitted: false,
            errorMessages: []
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.table(this.state.formData);

        // fake a 200 response
        this.setState({
            formSubmitted: true
        })
    }

    passwordErrorMsg() {
        const { formData } = this.state;
        const { password1, password2 } = this.state.formData;
        const passwordsMatch = formData.password1 === formData.password2;

        return (!passwordsMatch && password1.length > 0 && password2.length > 0)
            ? ["Passwords do not match"] : [];
    }

    checkFormCompletion() {
        const { formData } = this.state;
        const passwordsMatch = formData.password1 === formData.password2;
        const fieldsCompleted = _.map(formData, (data) => data.length > 0 );
        const isFormCompleted = _.every(fieldsCompleted, (field)=> field);

        this.setState({
            buttonEnabled: isFormCompleted && passwordsMatch
        });
    }

    handleOnChange(e) {
        const { value, name } = e.target;

        this.setState({
            formData: { ...this.state.formData, [name]: value }
            }, () => {
            this.checkFormCompletion();
        });
    }

    titleOptions() {
        return [{value: "mr", text:"Mr"},
            {value: "Mrs", text:"Mrs"},
            {value: "miss", text:"Miss"},
            {value: "dr", text:"Dr"}]
    }

    render() {
        const { title, username, email, password1, password2 } = this.state.formData;
        const { buttonEnabled, errorMessages, formSubmitted } = this.state;
        
        return (
            <div className="conatiner">
                <form className="form" onSubmit={(e) => { this.handleSubmit(e)}}>
                    <h1 className="form__header">Would you like to know more?</h1>
                    <fieldset className="form_fieldset">
                        <FormSelect
                            options={ this.titleOptions() }
                            selectValue={ title }
                            label="Title"
                            name="title"
                            callBack={(e) => { this.handleOnChange(e)}} />
                        <FormField
                            value={ username }
                            label="Username"
                            name="username"
                            callBack={(e) => { this.handleOnChange(e)}} />
                        <FormField
                            value={ email }
                            type="email"
                            label="Email"
                            name="email"
                            callBack={(e) => { this.handleOnChange(e)}} />
                        <FormField
                            value={ password1 }
                            label="Password"
                            name="password1"
                            callBack={(e) => { this.handleOnChange(e)}} />
                        <FormField
                            value={ password2 }
                            label="Repeat password"
                            name="password2"
                            callBack={(e) => { this.handleOnChange(e)}} />
                    </fieldset>
                    <Footer
                        labelState1={ "Submit" }
                        labelState2={ formSubmitted && "Success!" }
                        validationMessages={ this.passwordErrorMsg() }
                        errorMessages={ errorMessages }
                        isDisabled={ !buttonEnabled } />
                </form>
            </div>
        );
    }
}

export default Form;