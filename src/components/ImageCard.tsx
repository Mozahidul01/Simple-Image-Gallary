import { FC } from "react";
import { GallaryImage } from "./CardContainer";

interface ImageCardProps {
  data: GallaryImage;
  isSelected: boolean;
  onImageSelect: VoidFunction;
}

const ImageCard: FC<ImageCardProps> = ({ data, isSelected, onImageSelect }) => {
  return (
    <div
      className={`relative group border border-gray-300 min-h-56 rounded-md overflow-hidden`}
      draggable
      onClick={onImageSelect}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black group-hover:opacity-50 transition-opacity duration-300 ${
          isSelected ? "opacity-50" : "opacity-0"
        }`}
      ></div>
      <input
        type="checkbox"
        checked={isSelected}
        className={`absolute top-2 left-2 cursor-pointer ${
          isSelected ? "block" : "hidden"
        } group-hover:block checked:bg-blue-700`}
      />
      <img
        src={data?.imageUrl}
        alt={data?.name}
        className="w-full h-full"
      />
    </div>
  );
};

export default ImageCard;
