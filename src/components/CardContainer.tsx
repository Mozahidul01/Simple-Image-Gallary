import { useState } from "react";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { GalleryImage, galleryData } from "../data/gallaryData";

import ImageCard from "./ImageCard";
import ImageInput from "./ImageInput";
import { Container } from "./Container";

export default function CardContainer() {
  const [galleryImages, setGalleryImages] =
    useState<GalleryImage[]>(galleryData);

  const [selectedImages, setSelectedImages] = useState<GalleryImage[]>([]);

  // Input New Image to gallary
  const handleImageSelect = (image: File | null) => {
    if (!image) return;

    const data: GalleryImage = {
      id: Math.round(Math.random() * 10),
      name: image.name,
      imageUrl: URL.createObjectURL(image),
    };

    setGalleryImages((prev) => [...prev, data]);
  };

  // handle Image resorting using drag and drop
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(galleryImages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setGalleryImages(items);
  };

  // Delete selected items
  const deleteHandler = () => {
    setGalleryImages((prev) =>
      prev.filter((item) => !selectedImages.includes(item))
    );
    setSelectedImages([]);
  };

  return (
    <Container>
      <div className="bg-white py-8 rounded-md divide-y shadow">
        <div className="flex justify-between px-4 mb-4">
          {selectedImages && selectedImages.length > 0 ? (
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={selectedImages.length > 0}
                className="checked:bg-blue-700"
              />
              <p className="text-lg font-semibold">
                <span>{selectedImages?.length}</span> file Selected
              </p>
            </div>
          ) : (
            <p className="text-lg font-semibold">Gallary</p>
          )}
          <button
            className="text-base font-medium text-red-500 hover:underline"
            onClick={deleteHandler}
          >
            Delete Files
          </button>
        </div>

        <div className="px-6">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId="gallery"
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`mt-4
                    grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 auto-rows-1
                    overflow-hidden
                    ${snapshot.isDraggingOver ? "h-auto" : "h-full"}
                  `}
                >
                  {galleryImages.map((data, index) => (
                    <Draggable
                      key={data.id}
                      draggableId={data.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${
                            index === 0
                              ? "col-span-2 row-span-2"
                              : "col-span-1 row-span-1"
                          }`}
                        >
                          <ImageCard
                            data={data}
                            isSelected={selectedImages.includes(data)}
                            onImageSelect={() => {
                              if (selectedImages.includes(data)) {
                                setSelectedImages((prev) =>
                                  prev.filter((item) => item !== data)
                                );
                              } else {
                                setSelectedImages((prev) => [...prev, data]);
                              }
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <ImageInput onImageSelect={handleImageSelect} />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    </Container>
  );
}
