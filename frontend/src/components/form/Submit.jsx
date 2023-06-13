import React from "react";
import {ImSpinner3} from "react-icons/im"

export default function Submit({busy, value }) {
  return (
    <button
      type="submit"
      className="w-full rounded dark:bg-white bg-secondary dark:text-secondary
       text-white hover:bg-opacity-90 transition font-semibold text-lg 
       cursor-pointer h-10 flex justify-center items-center"
      
    >
        {busy ? <ImSpinner3 className="animate-spin"/> : value }
    </button>
  );
}
