import React from "react";
import { useState } from "react";
import Navigation from "./Navigation";
import Logo from "./Logo";
import Auth from "./Auth";
import DarkThemeToggler from "./DarkThemeToggler";
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = (props) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded((prevState) => !prevState);
  };
  return (
    <div>
      <nav className="bg-gray-50 dark:bg-gray-900">
        <div
          className={`max-w mx-auto px-3 flex items-center h-16 justify-between ${
            expanded ? "" : "shadow-xl"
          }`}
        >
          <Logo />
          <div className="hidden md:flex max-w flex-grow items-center">
            <div className="ml-20">
              <Navigation user={props.user} />
            </div>
            <div className="ml-auto">
              <Auth user={props.user} />
            </div>
            <div className="ml-3">
              <DarkThemeToggler
                darkTheme={props.darkTheme}
                toggleDarkTheme={props.toggleDarkTheme}
              />
            </div>
          </div>

          <div
            className="text-gray-900 dark:text-white text-xl cursor-pointer md:hidden"
            onClick={toggleExpanded}
          >
            <span className="sr-only">Expand navbar</span>
            <GiHamburgerMenu />
          </div>
        </div>

        {expanded && (
          <div className="md:hidden">
            <div className="px-3 pt-2 pb-3 flex flex-col space-y-5 ">
              <Navigation onSelection={toggleExpanded} user={props.user} />
              <div className="flex items-end space-y-0 justify-between">
                <Auth user={props.user} />
                <DarkThemeToggler
                  darkTheme={props.darkTheme}
                  toggleDarkTheme={props.toggleDarkTheme}
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
export default Navbar;
