import React, { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

export default function Actors() {
  return (
    <div className="grid grid-cols-4 gap-3 my-5">
      <ActorProfile
        profile={{
          name: "John Doe",
          avatar:
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ab assumenda saepe? Voluptatibus repudiandae dolore molestias quos omnis accusantium autem at vitae praesentium voluptatem! Enim sint totam soluta mollitia ratione.",
        }}
      />
      <ActorProfile
        profile={{
          name: "John Doe",
          avatar:
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ab assumenda saepe? Voluptatibus repudiandae dolore molestias quos omnis accusantium autem at vitae praesentium voluptatem! Enim sint totam soluta mollitia ratione.",
        }}
      />
      <ActorProfile
        profile={{
          name: "John Doe",
          avatar:
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ab assumenda saepe? Voluptatibus repudiandae dolore molestias quos omnis accusantium autem at vitae praesentium voluptatem! Enim sint totam soluta mollitia ratione.",
        }}
      />
      <ActorProfile
        profile={{
          name: "John Doe",
          avatar:
            "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
          about:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni ab assumenda saepe? Voluptatibus repudiandae dolore molestias quos omnis accusantium autem at vitae praesentium voluptatem! Enim sint totam soluta mollitia ratione.",
        }}
      />
    </div>
  );
}

const ActorProfile = ({ profile }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  if (!profile) return null;

  const { avatar, name, about = " " } = profile;

  return (
    <div className="bg-white shadow dark:shadow dark:bg-secondary rounded h-20 overflow-hidden">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 aspect-square object-cover"
        />

        <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold">
            {name}
          </h1>
          <p className="text-primary dark:text-white ">
            {about.substring(0, 50)}
          </p>
        </div>

        <Options visible={showOptions} />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;
  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      <button
        onClick={onDeleteClick}
        className="p-2 rounded-full bg-red-600 text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        className="p-2 rounded-full bg-green-600 text-primary hover:opacity-80 transition"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
