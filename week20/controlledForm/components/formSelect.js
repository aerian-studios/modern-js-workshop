import React from "react";

const FormSelect = ({id, label, callBack, value, options}) =>
    <div className="field">
        <label className="field__label" htmlFor={ id }>{ label }</label>
        <select
            id={ id }
            name={ id }
            value={ value }
            className="field field--select"
            onChange={ callBack }>
            {
                options.map(({optionsValue, text}, index) =>
                <option key={ `options-${index}` } value={ optionsValue }>{ text }</option>)
            }
        </select>
    </div>

export default FormSelect;