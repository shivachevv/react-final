import React from 'react';
import styles from './input.module.scss'
import { UserContext } from '../../UserProvider'

function Input({ id, label, value, onChange, onBlur, error }) {
    const test = React.useContext(UserContext);

    const changeHandler = (e) => {
        return onChange(e.target.value)
    }
    const blurHandler = (e) => {
        return onBlur(e.target.value)
    }

    return (
        <div >
            <label htmlFor={id}>{test.email}</label>
            <input className={error ? styles.error : ''} id={id} value={value} name={id} onChange={changeHandler} onBlur={blurHandler} placeholder={label}></input>
        </div>
    );
}

export default Input;