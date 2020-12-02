import React, { Component } from 'react';
import styles from '../styles/toggleToken.module.scss';

class ToggleToken extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: props.activeDefault
        }
    }

    toggle = () => {
        this.setState(state => {
            return { active: !state.active }
        });
        this.props.onClickFunc();
    }

    getStyles = active => active ? styles.active : styles.inactive;

    render = () => {
        return (
            <div className={`${styles.toggleToken} ${this.getStyles(this.state.active)}`} onClick={this.toggle}>
                {
                    this.props.name
                }
            </div>
        )
    }
}

export default ToggleToken;
