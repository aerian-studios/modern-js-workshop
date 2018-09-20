import React from "react";

const FormField = ({ label, id, type, callBack, maxLength, value, isRequired }) =>
    <div className="field">
        <label className="field__label" htmlFor={ id }>{ label }</label>
        <input
            id={ id }
            name={ id }
            value={ value }
            type={ type ? type : "text" }
            required={ isRequired }
            maxLength={ maxLength ? maxLength : 50 }
            className="field__input field__input--text"
            onChange={ (e) => { callBack(e) }} />
    </div>

export default FormField;