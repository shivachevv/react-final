import React from 'react';
import styles from './input.module.scss'

function Input({id, label, value, onChange, onBlur }) {

    const changeHandler = (e) => {
        return onChange(e.target.value)
    }
    const blurHandler = (e) => {
        return onBlur(e.target.value)
    }

    return (
        <div>
            {/* <label htmlFor={id}>{label}</label> */}
            <input id={id} value={value} name={id} onChange={changeHandler} onBlur={blurHandler} placeholder={label}></input>
          </div>
    );
}

export default Input;