import { useDrop } from "react-dnd";
import { DragItem, DRAG_TYPE, Folder, OnMoveImage } from "../utils";
import Image from "./Image";

type Props = {
  button: JSX.Element;
  folderId: number;
  folderName: JSX.Element;
  isFirst: boolean;
  imageUrls: Folder["imageUrls"];
  onMoveImage: OnMoveImage;
};

const Section = ({
  button,
  folderId,
  folderName,
  imageUrls,
  isFirst,
  onMoveImage,
}: Props) => {
  const [{ canDrop, isOver }, dropRef] = useDrop(
    () => ({
      accept: DRAG_TYPE,

      drop: () => ({ folderId }),

      canDrop: ({ imageUrl }: DragItem) => !imageUrls.includes(imageUrl),

      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [imageUrls]
  );

  return (
    <div
      className={`border bg-slate-200 px-4 pb-4 ${
        isFirst ? "" : "border-x-0 border-t border-b-0 border-slate-300"
      } ${!isOver ? "" : canDrop ? "bg-teal-100" : "bg-red-100"}`}
      ref={dropRef}
    >
      {folderName}

      <div className="grid grid-cols-[auto_1fr] items-start gap-3">
        {button}

        <div className="flex flex-wrap gap-3">
          {imageUrls.map((imageUrl) => (
            <Image
              imageUrl={imageUrl}
              key={imageUrl}
              onMoveImage={onMoveImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section;
