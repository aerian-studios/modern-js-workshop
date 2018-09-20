import React, { Component } from "react";
import FormInput from "./formInput";
import Footer from "./footer";
import FormSelect from "./formSelect";
import _ from 'lodash';

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formData: {
                title: "Mr",
                firstname: "",
                surname: "",
                email: "",
                password1: "",
                password2: "",
            },
            buttonEnabled: false,
            formSubmitted: false,
            validationMessages: []
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

    passwordsMatchValid() {
        const { password1, password2 } = this.state.formData;
        return ((password1 !== password2) && password1.length > 0) ? ["Passwords do not match"] : [];
    }

    passwordsLengthValid() {
        const { password1 } = this.state.formData;
        return ((password1.length < 6) && password1.length > 0) ? ["Password need to be at least 6 characters long"] : [];
    }

    passwordAlphanumericValid() {
        const { password1 } = this.state.formData;
        const isAlphaNumeric = () =>
            (/\d/).test(password1) && (/[a-z]/i).test(password1);

        return (!isAlphaNumeric() && password1.length > 0) ? ["Password need to include both letters numbers"] : [];
    }

    validation() {
        const passwordsLengthMsg = this.passwordsLengthValid();
        const passwordAlphanumericMsg = this.passwordAlphanumericValid();
        const passwordsMatchMsg = this.passwordsMatchValid();
        // Add any other validation here

        this.setState({
            validationMessages: [...passwordsMatchMsg, ...passwordsLengthMsg, ...passwordAlphanumericMsg]
        });
    }

    checkFormCompletion() {
        const { formData } = this.state;
        const passwordsMatch = formData.password1 === formData.password2;
        const fieldsCompleted = _.map(formData, (data) => data.length > 0 );
        const isFormCompleted = _.every(fieldsCompleted, (field)=> field);

        this.setState({
            buttonEnabled: isFormCompleted && passwordsMatch,
        });
    }

    handleChange(e) {
        const { value, name } = e.target;

        this.setState({
            formData: { ...this.state.formData, [name]: _.trimStart(value) }
            }, () => {
            this.validation();
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
        const { title, firstname, surname, email, password1, password2 } = this.state.formData;
        const { buttonEnabled, formSubmitted, validationMessages } = this.state;
        
        return (
            <div className="conatiner">
                <form className="form" onSubmit={(e) => { this.handleSubmit(e)}}>
                    <h1 className="form__header">Would you like to know more?</h1>
                    <fieldset className="form_fieldset">
                        <FormSelect
                            options={ this.titleOptions() }
                            value={ title }
                            label="Title"
                            id="title"
                            callBack={(e) => { this.handleChange(e)}} />
                        <FormInput
                            value={ firstname }
                            label="First name"
                            id="firstname"
                            callBack={(e) => { this.handleChange(e)}} />
                        <FormInput
                            value={ surname }
                            label="Surname"
                            id="surname"
                            callBack={(e) => { this.handleChange(e)}} />
                        <FormInput
                            value={ email }
                            type="email"
                            label="Email"
                            id="email"
                            callBack={(e) => { this.handleChange(e)}} />
                        <FormInput
                            value={ password1 }
                            label="Password"
                            hint={ "password must be at least 6 characters and contain both letters and numbers" }
                            id="password1"
                            callBack={(e) => { this.handleChange(e)}} />
                        <FormInput
                            value={ password2 }
                            label="Repeat password"
                            id="password2"
                            callBack={(e) => { this.handleChange(e)}} />
                    </fieldset>
                    <Footer
                        buttonLabelState1={ "Submit" }
                        buttonLabelState2={ formSubmitted && "Success!" }
                        validationMessages={ validationMessages }
                        isDisabled={ !buttonEnabled } />
                </form>
            </div>
        );
    }
}

export default Form;