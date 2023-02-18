import React from 'react';
import ReactDOM from "react-dom";

interface Props {
  close: () => void;
  children: JSX.Element | JSX.Element[];
}

const portalElement = document.getElementById('overlays');

function Modal({ close, children }: Props) {
  return ReactDOM.createPortal((<>
      <div
        onClick={close}
        className='fixed w-screen h-screen top-0 z-10 backdrop-blur bg-black/50' />
      {children}
    </>), portalElement!)
}

export default Modal;