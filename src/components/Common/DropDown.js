import React, { useEffect, useState, useRef } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
const DropDown = (props) => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const bodyClickEvent = (e) => {
      if (menuRef.current !== null && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("click", bodyClickEvent);
    }

    return () => {
      window.removeEventListener("click", bodyClickEvent);
    };
  }, [open, menuRef]);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={toggle}>
        {props.children ? props.children : <FiMoreHorizontal />}
      </div>

      {open && (
        <div
          className="origin-top-right absolute mt-2 inset-x-1 md:-inset-x-40 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
        >
          {props.options.map((option, index) => {
            return (
              <div
                key={index}
                className={`block px-4 py-2 text-sm text-gray-900 dark:text-white ${
                  option.func
                    ? "hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    : ""
                }`}
                onClick={() => {
                  if (option.func) {
                    option.func();
                    toggle();
                  }
                }}
              >
                {option.content}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default DropDown;
