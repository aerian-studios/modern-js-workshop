import React from "react";

const FormFieldSet = ({ filedText, filedId, type }) =>
    <div className="field">
        <label className="field__label" htmlFor={filedId}>{filedText}</label>
        <input
            id={filedId}
            type={ type }
            required
            maxLength="50"
            className="field__input field__input--text" />
    </div>


export default FormFieldSet;