import React from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

const PopupModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default PopupModal;
