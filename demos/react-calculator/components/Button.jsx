import React from "react";
import styles from './Button.module.css'

const isOperator = val => !isNaN(val) || val === '.' || val === '=';

const getButtonType = props => {
    if (props.children === 'Clear') return styles.clear
    if (!isOperator(props.children)) return styles.operator
    else return null;
};

const Button = props => (
    <div
        className={`${styles.button} ${getButtonType(props)}`}
        onClick={() => props.onClickButton(props.children)}
    >
        {props.children}
    </div>
)

export default Button;