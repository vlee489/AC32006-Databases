import React, { useState } from 'react';
import styles from '../styles/toggleToken.module.scss';

const ToggleToken = ({ children, onClickFunc, activeDefault }) => {
    const [active, setActive] = useState(activeDefault);

    const toggle = () => {
        setActive(prevState => !prevState);
        onClickFunc(children);
    }

    const getStyles = active => active ? styles.active : styles.inactive;

    return (
        <div className={`${styles.toggleToken} ${getStyles(active)}`} onClick={toggle}>
            {
                children
            }
        </div>
    )
}

export default ToggleToken;
