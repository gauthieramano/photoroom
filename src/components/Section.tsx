import { Folder } from "../utils";
import AddButton from "./AddButton";

type Props = {
  folder: Folder;
  isFirst: boolean;
  onImageAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Section = ({
  folder: { name, imageUrls },
  isFirst,
  onImageAdd,
}: Props) => (
  <div className="border bg-slate-200 p-4">
    <p className={`${isFirst ? "pb-4" : "border-t border-slate-400 py-4"}`}>
      {name}
    </p>

    <div className="flex flex-wrap gap-3">
      <AddButton onImageAdd={onImageAdd} />
      {imageUrls.map((imageUrl) => (
        <img
          alt="uploaded image"
          className="rounded-lg border border-slate-400 bg-white p-1"
          key={imageUrl}
          src={imageUrl}
          width={300}
        />
      ))}
    </div>
  </div>
);

export default Section;
