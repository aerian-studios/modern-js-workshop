import React, { Component } from "react";
import FormInput from "./formInput";
import Footer from "./footer";
import FormSelect from "./formSelect";

// Helper functions
const isMatchValid = (value1, value2, title) =>
    ((value1 !== value2) && value1.length > 0) ? [`${title} do not match`] : [];

const isLengthValid = (value, title, length) =>
    ((value.length < length) && value.length > 0) ? [`${title} need to be at least 6 characters long`] : [];

const isAlphanumeric = (value, title) => {
    const isAlphaNumeric = () =>
        (/(\d+\w+)|(\w+\d+)[\w|\d]?/).test(value);
    return (!isAlphaNumeric() && value.length > 0) ? [`${title} need to include both letters numbers`] : [];
};

const isFormComplete = (formData) => {
    const fieldsValues = Object.values(formData);
    return fieldsValues.every((data) => data.length > 0)
};


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

    checkFormCompletion() {
        const { formData, validationMessages } = this.state;

        this.setState({
            buttonEnabled: isFormComplete(formData) && validationMessages.length === 0
        });
    }

    validation() {
        const { password1, password2 } = this.state.formData;
        const passwordsLengthMsg = isLengthValid(password1, "Password", 6);
        const passwordAlphanumericMsg = isAlphanumeric(password1, "Password");
        const passwordsMatchMsg = isMatchValid(password1, password2, "Password");
        // Add any other validation here

        this.setState({
            validationMessages: [...passwordsMatchMsg, ...passwordsLengthMsg, ...passwordAlphanumericMsg]
        }, () => {
            this.checkFormCompletion();
        });
    }

    handleChange(e) {
        const { value, name } = e.target;

        this.setState({
            formData: { ...this.state.formData, [name]: value }
            }, () => {
            this.validation();
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
            <div className="container">
                <form className="form" onSubmit={(e) => { this.handleSubmit(e)}}>
                    <h1 className="form__header">Would you like to know more?</h1>
                    <fieldset className="form_fieldset">
                        <FormSelect
                            options={ this.titleOptions() }
                            value={ title }
                            label="Title"
                            id="title"
                            callBack={ this.handleChange } />
                        <FormInput
                            value={ firstname }
                            label="First name"
                            id="firstname"
                            callBack={ this.handleChange } />
                        <FormInput
                            value={ surname }
                            label="Surname"
                            id="surname"
                            callBack={ this.handleChange } />
                        <FormInput
                            value={ email }
                            type="email"
                            label="Email"
                            id="email"
                            callBack={ this.handleChange } />
                        <FormInput
                            value={ password1 }
                            label="Password"
                            hint={ "password must be at least 6 characters and contain both letters and numbers" }
                            id="password1"
                            callBack={ this.handleChange } />
                        <FormInput
                            value={ password2 }
                            label="Repeat password"
                            id="password2"
                            callBack={ this.handleChange } />
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