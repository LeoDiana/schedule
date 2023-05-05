import React from 'react';
import ReactDOM from 'react-dom';

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
    <div className='fixed z-20 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2'>
      {children}
    </div>
  </>), portalElement!);
}

export default Modal;