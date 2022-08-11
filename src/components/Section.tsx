import { useDrop } from "react-dnd";
import { DragItem, DRAG_TYPE, Folder, OnMoveImage } from "../utils";
import Image from "./Image";

type Props = {
  button: JSX.Element;
  folder: Folder;
  folderId: number;
  isFirst: boolean;
  onMoveImage: OnMoveImage;
};

const Section = ({
  button,
  folder: { name, imageUrls },
  folderId,
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
    <div className="border bg-slate-200 p-4" ref={dropRef}>
      <p className={`${isFirst ? "pb-4" : "border-t border-slate-400 py-4"}`}>
        {name}
      </p>

      <div
        className={`flex flex-wrap gap-3 ${
          !isOver ? "" : canDrop ? "bg-teal-200" : "bg-red-200"
        }`}
      >
        {button}
        {imageUrls.map((imageUrl) => (
          <Image imageUrl={imageUrl} key={imageUrl} onMoveImage={onMoveImage} />
        ))}
      </div>
    </div>
  );
};

export default Section;
