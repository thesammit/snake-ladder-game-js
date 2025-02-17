import { createPortal } from 'react-dom';
import { Children } from 'react';
import './modal.css';

export const MODAL_KEYS = {
    HEADER: 'modal-header',
    BODY: 'modal-body',
    FOOTER: 'modal-footer'
}
const Modal = ({ showModal, onClose, children, contentWidth }) => {
    const getChild = (key) => {
        Children.toArray(children);
        return children.find(child => child.key === key);
    }
    return createPortal(
        <div className={`modal${showModal ? ' show' : ''}`}>
            <div className='modal-content' style={{ width: contentWidth }}>
                <div className="modal-header">
                    <span onClick={onClose} className="close">&times;</span>
                    <h2>{getChild(MODAL_KEYS.HEADER)}</h2>
                </div>
                <div className="modal-body">{getChild(MODAL_KEYS.BODY)}</div>
                <div className="modal-footer">{getChild(MODAL_KEYS.FOOTER)}</div>
            </div>
        </div>,
        document.getElementById('root'));
}

export default Modal;