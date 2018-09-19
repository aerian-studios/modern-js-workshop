import React, { Component } from "react";
import FormField from "./formField";
import Footer from "./footer";

class Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
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

    gatherFieldData (e, id) {
        this.setState({
            [id]: e.target.value
        })
    }

    render() {
        return (
            <div className="conatiner">
                <form className="form" onSubmit={(e) => {
                    this.handleSubmit(e)
                }}>
                    <h1 className="form__header">Would you like to know more?</h1>
                    <fieldset className="form_fieldset">
                        <FormField filedText="Username"
                                   filedId="username"
                                   type="text"
                                   callBack={ (e, id) => { this.gatherFieldData(e, id) }} />
                        <FormField filedText="Email"
                                   filedId="email"
                                   type="text"
                                   callBack={ (e, id) => { this.gatherFieldData(e, id) }} />
                        <FormField filedText="Password"
                                   filedId="password1"
                                   type="text"
                                   callBack={ (e, id) => { this.gatherFieldData(e, id) }} />
                        <FormField filedText="Please confirm password"
                                   filedId="password2"
                                   type="text"
                                   callBack={ (e, id) => { this.gatherFieldData(e, id) }} />
                    </fieldset>
                    <Footer />
                </form>
            </div>
        );
    }
}

export default Form;