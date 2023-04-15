import React from "react";
import "./CardImage.css";

interface ImageProps {
  fileName: string;
}

const CardImage: React.FC<ImageProps> = ({
  fileName
}) => {
  return (
    <>
      <div className={`game-card card-${fileName}`}/>
    </>
  );
};

export default CardImage;
