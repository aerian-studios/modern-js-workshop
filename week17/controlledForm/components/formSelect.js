import React from "react";

const FormSelect = ({name, label, callBack, selectValue, options}) =>
    <div className="field">
        <label className="field__label" htmlFor={ name }>{ label }</label>
        <select
            id={ name }
            name={ name }
            value={ selectValue }
            className="field field--select"
            onChange={ (e) => { callBack(e) } }>
            { options.map(({value, text}) => <option key={ value } value={ value }>{ text }</option>) }
        </select>
    </div>

export default FormSelect;