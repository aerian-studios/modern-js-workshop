import React from "react";

const FormInput = ({ label, id, type, callBack, maxLength, value, isRequired, hint }) =>
    <div className="field">
        <label className="field__label" htmlFor={ id }>{ label }</label>
        { hint && <span className="field__hint">{ hint}</span> }
        <input
            id={ id }
            name={ id }
            value={ value }
            type={ type ? type : "text" }
            required={ isRequired }
            maxLength={ maxLength ? maxLength : 50 }
            className="field__input field__input--text"
            onChange={ callBack } />
    </div>

export default FormInput;