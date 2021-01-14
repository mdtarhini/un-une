import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
const DarkThemeToggler = (props) => {
  return (
    <div
      className="text-2xl text-gray-900 dark:text-gray-300 cursor-pointer"
      onClick={props.toggleDarkTheme}
    >
      {props.darkTheme ? <FaSun /> : <FaMoon />}
      <span className="sr-only">Toggle dark theme</span>
    </div>
  );
};
export default DarkThemeToggler;
