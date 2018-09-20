import React, { Component } from "react";
import FormField from "./formField";
import PasswordFields from "./passwordFields";
import Footer from "./footer";
import FormSelect from "./formSelect";

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Mr",
            username: "",
            email: "",
            password1: "",
            password2: ""
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        console.table(this.state);
    }

    setFormState(e) {
        // Validation here?
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    titleOptions() {
        return [{value: "mr", text:"Mr"},
                {value: "Mrs", text:"Mrs"},
                {value: "miss", text:"Miss"},
                {value: "dr", text:"Dr"}]
    }

    render() {
        return (
            <div className="conatiner">
                <form className="form" onSubmit={(e) => {
                    this.handleSubmit(e)
                }}>
                    <h1 className="form__header">Would you like to know more?</h1>
                    <fieldset className="form_fieldset">
                        <FormSelect
                            options={ this.titleOptions() }
                            selectValue={ this.state.title }
                            label="Title"
                            name="title"
                            callBack={ (e) => { this.setFormState(e) }} />
                        <FormField
                            label="Username"
                            name="username"
                            callBack={ (e) => { this.setFormState(e) }} />
                        <FormField
                            label="Email"
                            name="email"
                            callBack={ (e) => { this.setFormState(e) }} />
                        <PasswordFields
                            callBack={ (e) => { this.setFormState(e) }} />
                    </fieldset>
                    <Footer
                        validationMsg={ "" }
                        errorMsg={ "" }
                        isDisbaled={ false } />
                </form>
            </div>
        );
    }
}

export default Form;