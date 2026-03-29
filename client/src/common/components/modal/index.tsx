// -- == [[ IMPORTS ]] == -- \\

// CSS

import './modal.css';


// Types

import type { PropsWithChildren } from 'react';



// -- == [[ COMPONENTS ]] == -- \\

type ModalProps = {
    className: string;
} & PropsWithChildren;

const Modal = ({
    className,
    children
}: ModalProps) => {
    return (
        <div className={`modal-background ${className}`}>
            <div className="modal-foreground">
                {children}
            </div>
        </div>
    )
}



// -- == [[ EXPORTS ]] == -- \\

export default Modal