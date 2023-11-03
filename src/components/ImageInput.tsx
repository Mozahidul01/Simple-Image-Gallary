import { FC, useRef } from "react";

interface ImageInputProps {
  onImageSelect: (image: File | null) => void;
}

const ImageInput: FC<ImageInputProps> = ({ onImageSelect }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files ? e.target.files[0] : null;
    if (selectedImage) {
      onImageSelect(selectedImage);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onImageSelect(file);
  };

  return (
    <div
      className="border border-dashed border-gray-300 min-h-[10rem] rounded-md bg-gray-50 flex flex-col items-center justify-center p-10 cursor-pointer"
      onClick={() => fileRef.current?.click()}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/x-png,image/gif,image/jpeg"
        className="hidden"
        onChange={handleImageChange}
      />

      <img
        src="/images/placeholder-image.png"
        alt="placeholder"
        className="w-8 mb-2"
      />

      <p className="text-sm font-medium">Add Images</p>
    </div>
  );
};

export default ImageInput;
