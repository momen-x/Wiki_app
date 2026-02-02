"use client";
import { ToastContainer } from "react-toastify";

const ToasterProvider = () => {
  return (
    <div>
      <ToastContainer  position="bottom-right"/>
    </div>
  );
};

export default ToasterProvider;
