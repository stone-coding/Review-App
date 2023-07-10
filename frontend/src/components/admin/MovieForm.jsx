import React, { useState } from "react";
import TagsInput from "../TagsInput";
import { commonInputClass } from "../../utils/theme";
import LiveSearch from "../LiveSearch";
import Submit from "../form/Submit";
import { useNotification } from "../../hooks";
import ModalContainer from "../modals/ModalContainer";
import WritersModal from "../modals/WritersModal";
import CastForm from "../form/CastForm";
import CastModal from "../modals/CastModal";

export const results = [
  {
    id: "1",
    avatar:
      "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "John Doe",
  },
  {
    id: "2",
    avatar:
      "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Chandri Anggara",
  },
  {
    id: "3",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "4",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
  {
    id: "5",
    avatar:
      "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Amin RK",
  },
  {
    id: "6",
    avatar:
      "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
    name: "Edward Howell",
  },
];

export const renderItem = (result) => {
  return (
    <div key={result.id} className="flex space-x-2 rounded overflow-hidden">
      <img
        src={result.avatar}
        alt={result.name}
        className="w-16 h-16 object-cover"
      />
      <p className="dark:text-white font-semibold">{result.name}</p>
    </div>
  );
};

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  languageL: "",
  status: "",
};

export default function MovieForm() {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWritersModal, setshowWritersModal] = useState(false);
  const [showCastModal, setshowCastModal] = useState(false);

  const { updateNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieInfo);
  };

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id) {
        return updateNotification(
          "warning",
          "This profile is already selected"
        );
      }
    }

    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };


  const hideWritersModal = () => {
    setshowWritersModal(false);
  };

  const displayWritersModal = () => {
    setshowWritersModal(true);
  };

  const hideCastModal = () => {
    setshowCastModal(false);
  };

  const displayCastModal = () => {
    setshowCastModal(true);
  };

  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) hideWritersModal();
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    if (!newCast.length) hideCastModal();
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const { title, storyLine, director, writers,cast } = movieInfo;
  return (
    <>
      <div className="flex space-x-3">
        <div className="w-[70%] h-5 space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              id="title"
              value={title}
              onChange={handleChange}
              name="title"
              type="text"
              className={
                commonInputClass + " border-b-2 font-semibold text-xl "
              }
              placeholder="Titanic"
            />
          </div>

          <div>
            <Label htmlFor="storyLine">Story line</Label>
            <textarea
              value={storyLine}
              onChange={handleChange}
              name="storyLine"
              id="storyLine"
              className={commonInputClass + " border-b-2 resize-none h-24 "}
              placeholder="Movie story line..."
            ></textarea>
          </div>

          <div>
            <Label htmlFor="Tags">Tags</Label>
            <TagsInput name="tags" onChange={updateTags}>
              {" "}
            </TagsInput>
          </div>

          <div>
            <Label htmlFor="director">Director</Label>
            <LiveSearch
              name="director"
              value={director.name}
              placeholder="Search Profile"
              results={results}
              renderItem={renderItem}
              onSelect={updateDirector}
            ></LiveSearch>
          </div>

          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={writers.length} htmlFor="writers">
                Writers
              </LabelWithBadge>
              <ViewAllBtn
                onClick={displayWritersModal}
                visible={writers.length}
              >
                View All
              </ViewAllBtn>
            </div>

            <LiveSearch
              name="writers"
              placeholder="Search Profile"
              results={results}
              renderItem={renderItem}
              onSelect={updateWriters}
            ></LiveSearch>
          </div>

          <div>
            <div className="flex justify-between">
              <LabelWithBadge badge={cast.length} >
                Add Cast & Crew
              </LabelWithBadge>
              <ViewAllBtn
              onClick={displayCastModal}
                visible={cast.length}
              >
                View All
              </ViewAllBtn>
            </div>

            <CastForm onSubmit={updateCast} />
          </div>

          <Submit value="Upload" onClick={handleSubmit} type='button'/>
        </div>
        <div className="w-[30%] h-5 bg-blue-400"></div>
      </div>

      <WritersModal
        onClose={hideWritersModal}
        profile={writers}
        visible={showWritersModal}
        onRemoveClick={handleWriterRemove}
      ></WritersModal>

    <CastModal
        onClose={hideCastModal}
        casts={cast}
        visible={showCastModal}
        onRemoveClick={handleCastRemove}
      ></CastModal>
    </>
  );
}

const Label = ({ children, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="dark:text-dark-subtle text-light-subtle font-semibold"
    >
      {children}
    </label>
  );
};

const LabelWithBadge = ({ children, htmlFor, badge = 0 }) => {
  const renderBadge = () => {
    if(!badge) return null
    return (
      <span
        className="dark:bg-dark-subtle bg-light-subtle text-white 
      absolute top-0 right-0 translate-x-2 -translate-y-1 text-xs w-5 h-5 rounded-full flex justify-center items-center"
      >
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };
  return (
    <div className="relative">
      <Label htmlFor={htmlFor}>{children}</Label>
      {renderBadge()}
    </div>
  );
};

const ViewAllBtn = ({ visible, children, onClick }) => {
  if (!visible) return null;
  return (
    <button
      onClick={onClick}
      type="button"
      className="dark:text-white text-primary hover:underline transition"
    >
      {children}
    </button>
  );
};
