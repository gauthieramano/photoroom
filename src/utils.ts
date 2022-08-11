export type Folder = {
  name: string;
  imageUrls: string[];
};

export type Folders = Record<number, Folder>;

export type DragItem = { imageUrl: string };
export type DropResult = { folderId: number };

export type OnMoveImage = (nextFolderId: number, imageUrl: string) => void;
export type OnChangeFolderName = (folderName: string) => boolean;

export const DEFAULT_FOLDER_NAME = "Untitled Folder";

export const DRAG_TYPE = "IMAGE";

export const getFolderName = (folderId: number) => `Folder #${folderId}`;
