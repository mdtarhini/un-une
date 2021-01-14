import React from "react";
import { useState } from "react";
import FavoriteCard from "./FavoriteCard";

import { FaSearch } from "react-icons/fa";

const Favorites = ({ user, favorites }) => {
  const [filter, setFilter] = useState("");

  if (favorites) {
    return (
      <div className="mt-5 mx-auto w-full lg:w-1/2 px-3 flex flex-col space-y-3">
        <div className="relative">
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value.toLocaleLowerCase())}
            id="company_website"
            className="focus:outline-none flex-1 w-full rounded-md  py-3 px-10 mb-4 bg-white dark:bg-gray-900 dark:text-white bg-opacity-80"
            placeholder="Search in favorites..."
          />
          <span className="absolute left-2 top-4 text-gray-500 dark:text-gray-100">
            <FaSearch />
          </span>
        </div>

        {Object.keys(favorites)
          .filter((word) => {
            if (filter === "") {
              return true;
            } else {
              return word
                .toLocaleLowerCase()
                .includes(filter.toLocaleLowerCase());
            }
          })
          .map((word, index) => {
            return (
              <FavoriteCard
                word={word}
                variants={favorites[word].variants}
                key={`word_${index}`}
                filter={filter}
              />
            );
          })}
      </div>
    );
  } else {
    return (
      <div className="mt-5 mx-auto w-full lg:w-1/2 px-3 flex justify-center space-y-3">
        <div className="bg-white dark:bg-gray-900 dark:text-white rounded-md shadow-md p-2 relative">
          You didn't add any words yet!
        </div>
      </div>
    );
  }
};
export default Favorites;
