import React, { ButtonHTMLAttributes } from "react";
import "./Button.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
  ...rest
}) => {
  return (
    <button onClick={onClick} {...rest} className={className}>
      {label}
    </button>
  );
};

export default Button;
