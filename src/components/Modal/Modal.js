import React from 'react';

import Aux from '../../hoc/Auxi/Auxi';
import Backdrop from '../Backdrop/Backdrop';
import '../../styling/Modal.scss';

const modal = props => {
    return (
        <Aux>
            <Backdrop show = {props.show} clicked = {props.modalClosed} />
            <div
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    );
}