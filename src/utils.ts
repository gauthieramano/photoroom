export type Folder = {
  name: string;
  imageUrls: string[];
};

export type Folders = Record<number, Folder>;

export const DEFAULT_FOLDER_NAME = "Untitled Folder";

export const getFolderName = (folderId: number) => `Folder #${folderId}`;
