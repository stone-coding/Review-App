import React, { forwardRef, useEffect, useRef, useState } from "react";
import { commonInputClass } from "../utils/theme";



export default function LiveSearch({
  value='',
  placeholder='',
  results=[],
  selectedResultStyle,
  resultContainerStyle,
  inputStyle,
  renderItem=null, 
  onChange=null,
  onSelect=null,
}) {
  const [displaySearch, setdisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1); // when move the scroll bar array we do not want focus on any index

  const handleOnFocus = () => {
    if (results.length) setdisplaySearch(true);
  };

  const handleOnBlur = () => {
    setdisplaySearch(false);
    setFocusedIndex(-1);
  };

  const handleSelection = (selectedItem) => {
    onSelect(selectedItem);
  };

  const handleKeyDown = ({ key }) => {
    let nextCount;
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    // if user entered keys do not contains 'ArrowDown', 'ArrowUp','Enter','Escape'
    if (!keys.includes(key)) return;

    //movie selection up and down
    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % results.length;
    }

    if (key === "ArrowUp") {
      nextCount = (focusedIndex + results.length - 1) % results.length;
    }

    if (key === "Enter") return handleSelection(results[focusedIndex]);

    setFocusedIndex(nextCount);
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : commonInputClass + " rounded border-2 p-1 text-lg";
  };

  return (
    <div className="relative">
      <input
        type="text"
        className={getInputStyle()}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        value={value}
        onChange={onChange}
      />
      <SearchResult
        focusedIndex={focusedIndex}
        visible={displaySearch}
        results={results}
        onSelect={handleSelection}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
      ></SearchResult>
    </div>
  );
}


const SearchResult = ({
  visible,
  results = [],
  focusedIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef();
  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedIndex]);

  if (!visible) return null;

  return (
    <div className="absolute right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 overflow-auto mt-1 custom-scroll-bar">
      {results.map((result, index) => {
        const getSelectedClss = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };
        return (
          <ResultCard
            ref={index === focusedIndex ? resultContainer : null}
            key={result.id}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClss() : ""
            }
            onMouseDown={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
    onMouseDown,
  } = props;

  const getClasses = () => {
    if (resultContainerStyle)
      return resultContainerStyle + " " + selectedResultStyle;

    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition"
    );
  };
  return (
    <div
      onMouseDown={onMouseDown} // when click div on searchResults, we send entire result to onSelect
      ref={ref}
      className={getClasses()}
    >
      {renderItem(item)}
    </div>
  );
});
