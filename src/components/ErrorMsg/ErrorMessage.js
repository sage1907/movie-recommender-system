import React, { useEffect } from "react";
import ReactDOM from 'react-dom';
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { resetErrAction } from "../../redux/slices/globalActions/globalActions";

const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  }).then(() => {
    dispatch(resetErrAction());
  });
  }, [message, dispatch]);
  
  return null;
};

const ErrorMsgPortal = ({ message }) => {
  return ReactDOM.createPortal(
    <ErrorMsg message={message} />,
    document.body
  );
};

export default ErrorMsgPortal;