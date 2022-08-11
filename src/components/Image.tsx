import { useDrag } from "react-dnd";
import { DRAG_TYPE, DropResult, OnMoveImage } from "../utils";

type Props = {
  imageUrl: string;
  onMoveImage: OnMoveImage;
};

const Image = ({ imageUrl, onMoveImage }: Props) => {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: DRAG_TYPE,
      item: { imageUrl },

      end: (_item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();

        if (dropResult) {
          onMoveImage(dropResult.folderId, imageUrl);
        }
      },

      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [onMoveImage]
  );

  return (
    <img
      alt="uploaded image"
      className={`rounded-lg border border-slate-400 bg-white p-1 ${
        isDragging ? "opacity-30" : ""
      }`}
      ref={dragRef}
      src={imageUrl}
      width={300}
    />
  );
};

export default Image;
