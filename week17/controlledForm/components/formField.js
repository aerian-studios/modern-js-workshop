import React from "react";

const FormField = ({ filedText, filedId, type, callBack }) =>
    <div className="field" onChange={ (e) => { callBack(e, filedId) } }>
        <label className="field__label" htmlFor={filedId}>{filedText}</label>
        <input
            id={filedId}
            type={ type }
            required
            maxLength="50"
            className="field__input field__input--text" />
    </div>

export default FormField;