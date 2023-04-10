import useImage from "../../hooks/useImage";
import React from "react";
import loadingImage from "../../assets/images/card-back.png";

interface ImageProps {
  fileName: string;
  alt: string;
  className?: string;
}

const CardImage: React.FC<ImageProps> = ({
  fileName,
  alt,
  className,
  ...rest
}) => {
  const { loading, error, image } = useImage(fileName);

  if (error) return <div>{alt}</div>;

  return (
    <>
      {loading ? (
        <img src={loadingImage} alt="card-back" className={className}></img>
      ) : (
        <img
          className={className}
          src={image || undefined}
          alt={alt}
          {...rest}
        />
      )}
    </>
  );
};

export default CardImage;
