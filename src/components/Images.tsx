type Props = {
  imageUrls: string[];
};

const TITLE = "Untitled Folder";

const Images = ({ imageUrls }: Props) => (
  <div className="bg-slate-200 p-4">
    <p className="pb-4">{TITLE}</p>
    <div className="flex flex-wrap gap-3">
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

export default Images;
