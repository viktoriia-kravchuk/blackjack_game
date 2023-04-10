import { useEffect, useState } from "react";

const useImage = (fileName: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await import(`../assets/images/${fileName}`);
        setImage(response.default);
      } catch (err) {
        if (err instanceof Error) {
          setError(err as Error);
        } else {
          setError(new Error("Unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [fileName]);

  return {
    loading,
    error,
    image,
  };
};

export default useImage;
