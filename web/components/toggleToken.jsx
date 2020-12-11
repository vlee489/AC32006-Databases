import React, { Component } from 'react';
import styles from '../styles/toggleToken.module.scss';

class ToggleToken extends Component {
    constructor(props) {
        super(props)
    }

    getStyles = () => this.props.active ? styles.active : styles.inactive;

    render = () => {
        return (
            <div className={`${styles.toggleToken} ${this.getStyles()}`} onClick={e => this.props.toggle(e)}>
                {
                    this.props.name
                }
            </div>
        )
    }
}

export default ToggleToken;
