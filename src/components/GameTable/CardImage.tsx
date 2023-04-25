import React from "react";
import "./CardImage.css";

interface ImageProps {
  fileName: string;
  delay?: number;
}

const CardImage: React.FC<ImageProps> = ({ fileName, delay}) => {

  return (
    <>
      <div
        className={`game-card card-${fileName}`}
        style={{ animationDelay: `${delay}ms` }}
      />
    </>
  );
};

export default CardImage;
