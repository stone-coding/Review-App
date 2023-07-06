import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function TagsInput() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const input = useRef();
  const tagsInput = useRef();

  const handleOnChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return;

      if (tags.includes(tag)) return setTag("");

      setTags([...tags, tag]);
      setTag("");
    }

    // exclude last tag
    // !tag means no value of tag is typing now to prevent backspace remove typo types; tags.length means tags is not empty
    if (key === "Backspace" && !tag && tags.length) {
      const newTags = tags.filter((_, index) => index !== tags.length - 1);
      setTags([...newTags]);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags([...newTags]);
  };

  useEffect(() => {
    input.current.scrollIntoView();
  }, [tag]);

  const handleOnFcus = () => {
    tagsInput.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.add("dark:border-white", "border-primary");
  };

  const handleOnBlur = () => {
    tagsInput.current.classList.add(
        "dark:border-dark-subtle",
        "border-light-subtle"
      );
      tagsInput.current.classList.remove("dark:border-white", "border-primary");
  };

  return (
    <div>
      <div
        ref={tagsInput}
        onKeyDown={handleKeyDown}
        className="border-2 bg-transparent dark:border-dark-subtle
      border-light-subtle px-2 h-10 rounded w-full text-white flex 
        items-center space-x-2 overflow-x-auto custom-scroll-bar transition"
      >
        {tags.map((t) => (
          <Tag onClick={() => removeTag(t)} key={t}>
            {t}
          </Tag>
        ))}
        <input
          ref={input}
          type="text"
          className="h-full flex-grow bg-transparent outline-none dark:text-white"
          placeholder="Tag-x"
          value={tag}
          onChange={handleOnChange}
          onFocus={handleOnFcus}
          onBlur={handleOnBlur}
        />
      </div>
    </div>
  );
}

const Tag = ({ children, onClick }) => {
  return (
    <span
      className="dark:bg-white bg-primary dark:text-primary text-white
        items-center flex text-sm px-1 whitespace-nowrap"
    >
      {children}
      <button type="button" onClick={onClick}>
        <AiOutlineClose size={12} />
      </button>
    </span>
  );
};
