import React from "react";
import { BettingTokenProps } from "../../types";
import "./Token.css";

const Token = (props: BettingTokenProps) => {
  const { children, color, onClick , active} = props;
  const tokenClasses = color + " token" + (active ? " active" : "");
  const textClasses = color + " text";

  return (
    <button className={tokenClasses} onClick={onClick}>
      <div className={textClasses}>{children}</div>
    </button>
  );
};

export default Token;
