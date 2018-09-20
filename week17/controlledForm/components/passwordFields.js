import React, { Component } from "react";
import FormField from "./formField";

class PasswordFields extends Component {

    constructor(props) {
        super(props);

        this.state = {
            password1: "",
            password2: ""
        };
    }

    render() {
        return (
            <div>
                <FormField label="Password"
                           filedId="password1"
                           type="text"
                           callBack={ (e) => { this.props.callBack(e) }} />
                <FormField label="Repeat password"
                           filedId="password2"
                           type="text"
                           callBack={ (e) => { this.props.callBack(e) }} />
            </div>
        )
    }
}
export default PasswordFields;