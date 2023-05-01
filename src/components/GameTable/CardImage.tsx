import React, { useState, useEffect } from "react";
import "./CardImage.css";

const CardImage: React.FC<{ fileName: string; delay?: number }> = ({ fileName, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return <>{isVisible && <div className={`game-card card-${fileName}`} data-testid="game-card"/>}</>;
};

export default CardImage;