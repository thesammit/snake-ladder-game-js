import { createPortal } from "react-dom";
import { Children, useEffect } from 'react';
import './alert.css';
import { ReactComponent as SuccessIcon } from '../../assets/alert-success.svg';
import { ReactComponent as WarningIcon } from '../../assets/alert-warning.svg';
import { ReactComponent as DangerIcon } from '../../assets/alert-danger.svg';
import { ReactComponent as InfoIcon } from '../../assets/alert-info.svg';

export const ALERT_ELEM_KEYS = {
    EMPHASIZED: 'alert-em',
    BODY: 'alert-body'
}

export const ALERT_TYPE = {
    SUCCESS: 'success',
    DANGER: 'danger',
    WARNING: 'warning',
    INFO: 'info',
}

const colorValues = {
    success: "#2e7d32",
    danger: "#D74544",
    info: "#2B93D5",
    warning: "#EF7B29"
}

const iconComponents = {
    success: SuccessIcon,
    danger: DangerIcon,
    info: InfoIcon,
    warning: WarningIcon,
}

const IconComponent = ({ type }) => {
    const styleObj = { width: '20px', height: '20px' };
    const Component = iconComponents[type];
    return (<Component style={styleObj} stroke={colorValues[type]} />);
}

const Alert = ({ id, onClose, children, type, showIcon, timeOutInSec = 0 }) => {
    const getChild = (elmKey) => {
        Children.toArray(children);
        return children.find(child => child.key === elmKey);
    }

    const handleClose = () => {
        onClose(id);
    }

    useEffect(() => {
        let timer;
        if (timeOutInSec > 0) {
            timer = setTimeout(() => {
                onClose(id);
            }, timeOutInSec * 1000);
        }
        return () => { clearTimeout(timer); }
    }, [timeOutInSec, onClose, id])

    return createPortal(
        <div className={`alert ${type || ''}`}>
            <div className="alert-container">
                {showIcon && <div className="item">
                    <IconComponent type={type} />
                </div>}
                <div className="alert-content">
                    <span className="alert-emphasized">{getChild(ALERT_ELEM_KEYS.EMPHASIZED)}</span>
                    <span className="alert-body">{getChild(ALERT_ELEM_KEYS.BODY)}</span>
                </div>
            </div>
            {onClose && <div onClick={handleClose} className={`alert-close-btn item ${type || ''}`}>&times;</div>}
        </div>,
        document.getElementById('alert-global-container'));
}

export default Alert;