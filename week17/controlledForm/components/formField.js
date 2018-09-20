import React from "react";

const FormField = ({ label, filedId, type, callBack, maxLength, value, isRequired, name }) =>
    <div className="field">
        <label className="field__label" htmlFor={ filedId }>{ label }</label>
        <input
            id={ name }
            name={ name }
            value={ value }
            type={ type ? type : "text" }
            required={ isRequired }
            maxLength={ maxLength ? maxLength : 50 }
            className="field__input field__input--text"
            onChange={ (e) => { callBack(e, filedId) }} />
    </div>

export default FormField;