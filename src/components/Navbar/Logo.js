import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/">
      <span className="font-serif text-2xl text-dark-900 dark:text-white ">
        Un(e)
      </span>
    </Link>
  );
};
export default Logo;
