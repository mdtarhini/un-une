import React from "react";
import { Link, withRouter } from "react-router-dom";

const Navigation = (props) => {
  const items = [
    { label: "Search", value: "search", to: "/" },
    { label: "Quiz", value: "quiz", to: "/quiz" },
    props.user
      ? { label: "Favorites", value: "favorites", to: "/favorites" }
      : null,
  ];
  return (
    <div className="flex items-start flex-col md:flex-row space-y-5 md:space-y-0 space-x-0 md:space-x-4">
      {items.map((item) => {
        if (item) {
          return (
            <Link to={item.to} key={item.value} onClick={props.onSelection}>
              <span
                className={`text-md cursor-pointer p-0 md:p-2 ${
                  item.to === props.location.pathname
                    ? "text-dark-900 dark:text-white font-bold md:bg-gray-300 md:dark:bg-gray-700 md:rounded-md"
                    : "text-gray-800 dark:text-white"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
export default withRouter(Navigation);
