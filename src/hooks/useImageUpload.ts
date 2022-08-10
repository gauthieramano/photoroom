import loadImage, { LoadImageResult } from "blueimp-load-image";
import { ChangeEvent, useCallback, useState } from "react";
import { API_KEY, API_URL, BASE64_IMAGE_HEADER } from "../Constants";

const useImageUpload = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const uploadImageToServer = (file: File) => {
    loadImage(file, {
      maxWidth: 400,
      maxHeight: 400,
      canvas: true,
    })
      .then(async (imageData: LoadImageResult) => {
        const image = imageData.image as HTMLCanvasElement;
        const imageBase64 = image.toDataURL("image/png");
        const imageBase64Data = imageBase64.replace(BASE64_IMAGE_HEADER, "");
        const data = {
          image_file_b64: imageBase64Data,
        };

        // API call
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": API_KEY,
          },
          body: JSON.stringify(data),
        });

        if (response.status >= 400 && response.status < 600) {
          throw new Error("Bad response from server");
        }

        const result = await response.json();
        const base64Result = BASE64_IMAGE_HEADER + result.result_b64;

        setImageUrls([...imageUrls, base64Result]);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const onImageAdd = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      uploadImageToServer(e.target.files[0]);
    } else {
      console.error("No file was picked");
    }
  }, []);

  return { imageUrls, onImageAdd };
};

export default useImageUpload;
