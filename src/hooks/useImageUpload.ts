import loadImage, { LoadImageResult } from "blueimp-load-image";
import { ChangeEvent, useState } from "react";
import { API_KEY, API_URL, BASE64_IMAGE_HEADER } from "../Constants";
import { DEFAULT_FOLDER_NAME, Folders, getFolderName } from "../utils";

const useImageUpload = () => {
  const [folders, setFolders] = useState<Folders>({});

  const uploadImageToServer = (file: File, folderId: number) => {
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

        const name =
          folders[folderId]?.name ||
          (folderId ? getFolderName(folderId) : DEFAULT_FOLDER_NAME);

        const nextFolders = {
          ...folders,
          [folderId]: {
            name,
            imageUrls: [...(folders[folderId]?.imageUrls || []), base64Result],
          },
        };

        setFolders(nextFolders);
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const addFolder = () => {
    const folderId = Object.keys(folders).length;

    const nextFolders = {
      ...folders,
      [folderId]: {
        name: getFolderName(folderId),
        imageUrls: [],
      },
    };

    setFolders(nextFolders);
  };

  const addImage = (folderId: number) => (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      uploadImageToServer(e.target.files[0], folderId);
    } else {
      console.error("No file was picked");
    }
  };

  return { folders, addFolder, addImage };
};

export default useImageUpload;
