import React from "react";
import { BettingTokenProps } from "../../types";
import "./Token.css";

const Token = (props: BettingTokenProps) => {
  const { children, color, onClick, disabled, addClass, onTransitionEnd } =
    props;
  const tokenClasses =
    color +
    " token" +
    (disabled ? " dark-grey" : "") +
    (addClass ? ` ${addClass} active` : "");
  const textClasses = color + " text" + (disabled ? " dark-grey" : "");

  return (
    <button
      className={tokenClasses}
      onClick={onClick}
      disabled={disabled}
      onTransitionEnd={onTransitionEnd}
    >
      <div className={textClasses}>{children}</div>
    </button>
  );
};

export default Token;
