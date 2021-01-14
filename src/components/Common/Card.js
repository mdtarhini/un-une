import React from "react";
import { MdClose } from "react-icons/md";

const Card = (props) => {
  return (
    <div className="rounded-lg shadow-md px-4 py-6 relative mx-4 bg-white dark:bg-gray-900 text-black dark:text-white">
      <div
        className="absolute -top-2 -right-2 bg-red-500 text-2xl text-white rounded-2xl hover:bg-red-400"
        onClick={props.onClose}
      >
        <MdClose />
      </div>

      {props.children}
    </div>
  );
};
export default Card;
