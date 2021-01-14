import React from "react";
import { useState, useRef } from "react";
import dictApi from "../../api/dictionary";
import { FaSearch } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import Card from "../Common/Card";
import { addToFavorites, removeFromFavorites } from "../../firebase/favorites";
const Search = (props) => {
  const [searchedWord, setSearchedWord] = useState("");
  const [result, setResult] = useState(null);
  const inputRef = useRef(null);

  const getTranslation = () => {
    if (searchedWord) {
      dictApi
        .get(`/fr/${searchedWord}`)
        .then((res) => setResult(res.data))
        .catch((err) => {
          setResult("NOT FOUND");
        });
    }
  };
  const checkKeyDown = (e) => {
    if (e.code === "Enter") {
      getTranslation();
    }
  };
  const renderNounResults = (nounResults) => {
    return nounResults.map((variant, index) => {
      const partOfSpeech = variant.meanings[0]["partOfSpeech"];
      return (
        <div key={index} className="mx-10">
          <p className="text-2xl italic text-blue-500">
            <span className="font-bold">
              {partOfSpeech === "nom"
                ? "Un/Une "
                : partOfSpeech === "nom masculin"
                ? "Un "
                : "Une "}
            </span>
            <span>{searchedWord}</span>
          </p>
          <p className="mt-3">
            {variant.meanings[0].definitions[0].definition}
          </p>
        </div>
      );
    });
  };
  const favoriteButton = (nounResults) => {
    let variants = nounResults.map((variant) => {
      const partOfSpeech = variant.meanings[0]["partOfSpeech"];
      const gender =
        partOfSpeech === "nom"
          ? "mf "
          : partOfSpeech === "nom masculin"
          ? "m"
          : "f";
      const definition = variant.meanings[0].definitions[0].definition;
      return { gender, definition };
    });

    const isInFavorites = props.favorites
      ? Object.keys(props.favorites).includes(searchedWord.toLocaleLowerCase())
      : false;

    return (
      <button
        className="absolute -bottom-4 right-2 bg-blue-500 rounded-2xl text-white px-4 py-auto h-8 hover:bg-blue-600 hover:text-yellow-500 shadow-md text-lg"
        onClick={() => {
          if (isInFavorites) {
            removeFromFavorites(searchedWord.toLocaleLowerCase());
          } else {
            addToFavorites(searchedWord.toLocaleLowerCase(), variants);
          }
        }}
      >
        {isInFavorites ? (
          <AiFillStar className="text-yellow-400" />
        ) : (
          <AiOutlineStar />
        )}
        <span className="sr-only">Save to favorites</span>
      </button>
    );
  };
  const renderResultText = () => {
    if (result === "NOT FOUND") {
      return (
        <React.Fragment>
          <p className="text-2xl italic text-blue-500">{searchedWord}</p>
          <p>This is not a french word!</p>
        </React.Fragment>
      );
    } else {
      const nounResults = result.filter((variant) => {
        const partOfSpeech = variant.meanings[0]["partOfSpeech"];
        if (
          partOfSpeech === "nom masculin" ||
          partOfSpeech === "nom féminin" ||
          partOfSpeech === "nom"
        ) {
          return true;
        } else {
          return false;
        }
      });
      if (nounResults.length === 0) {
        return (
          <React.Fragment>
            <p className="text-2xl italic text-blue-500">{searchedWord}</p>
            <p>This is not a noun! (only french nouns have genders)</p>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            {renderNounResults(nounResults)}
            {props.user && favoriteButton(nounResults)}
          </React.Fragment>
        );
      }
    }
  };

  const renderResultCard = () => {
    return (
      <Card
        onClose={() => {
          setSearchedWord("");
          setResult(null);
          inputRef.current.focus();
        }}
      >
        <div className="flex flex-col space-y-6 mb-6">{renderResultText()}</div>
      </Card>
    );
  };
  return (
    <main>
      <div className="mt-10 mx-3  md:mx-6 lg:mx-20 xl:mx-44">
        <p className="text-xl dark:text-gray-100">
          <span className="font-bold">Feminine</span>, or{" "}
          <span className="font-bold">masculine</span>? That is the question you
          often ask yourself as a French learner. There are some rules, but
          there are always exceptions, and if you are like me, you will always
          end up guessing the opposite.
        </p>

        <div className=" flex border-b-2 border-gray-900 dark:border-white mt-6">
          <input
            ref={inputRef}
            value={searchedWord}
            autoFocus
            onChange={(e) => {
              setSearchedWord(e.target.value);
              setResult(null);
            }}
            type="text"
            className="w-full h-16  border-0 placeholder-gray-400 dark:placeholder-gray-100  bg-transparent px-3 text-2xl text-black dark:text-white focus:outline-none"
            placeholder="Type a french word here"
            onKeyDown={(e) => checkKeyDown(e)}
          />
          <button
            className="p-1 focus:outline-none focus:shadow-outline text-black dark:text-white text-lg"
            onClick={getTranslation}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-20  w-full flex justify-center">
          {renderResultCard()}
        </div>
      )}
    </main>
  );
};
export default Search;
