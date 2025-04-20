import React from "react";
import { Link } from "react-router-dom";

const CustomButton = ({ children, onClick, icon: Icon, className, to }) => {
  const buttonClasses = `flex items-center justify-center gap-2 pr-10  pl-5 py-2 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-500 transition ${className}`;

  return to ? (
    <Link to={to} className={buttonClasses}>
      {Icon && <Icon fontSize="large" />}
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={buttonClasses}>
      {Icon && <Icon fontSize="large" />}
      {children}
    </button>
  );
};

export default CustomButton;
