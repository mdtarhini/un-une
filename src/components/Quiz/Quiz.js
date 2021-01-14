import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Intro from "./Intro";
import { GiCheckMark } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import listOfWords from "./ListOfWords";
const Quiz = () => {
  const [chosenNumberOfWords, setChosenNumberOfWords] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentRoundResult, setCurrentRoundResult] = useState(null);
  const [arrayOfWords, setArrayOfWords] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (chosenNumberOfWords) {
      const shuffledListOfWords = listOfWords.sort(() => 0.5 - Math.random());
      setArrayOfWords(shuffledListOfWords.slice(0, chosenNumberOfWords));
    }
  }, [chosenNumberOfWords]);

  const handleNext = () => {
    setCurrentRoundResult(null);

    setCurrentRound((currentRound) => currentRound + 1);
  };

  const handleAnswer = (gender) => {
    if (gender === arrayOfWords[currentRound - 1].gender) {
      setCurrentRoundResult("right");
      setScore((score) => score + 1);
    } else {
      setCurrentRoundResult("wrong");
    }
  };
  const handleReplay = () => {
    setChosenNumberOfWords(null);
    setCurrentRoundResult(null);
    setCurrentRound(1);
    setScore(0);
  };
  const Round = () => {
    return (
      <React.Fragment>
        <div className="absolute -top-4 bg-blue-500 rounded-2xl text-white px-4 py-auto h-8 shadow-md text-lg">
          {`${currentRound}/${chosenNumberOfWords}`}
        </div>

        <div className="text-2xl italic">
          {currentRoundResult && (
            <span className="text-green-500">{`${
              arrayOfWords[currentRound - 1].gender === "m" ? "Un " : "Une "
            }`}</span>
          )}
          <span className="text-black dark:text-white">
            {arrayOfWords[currentRound - 1].word}
          </span>
        </div>

        {!currentRoundResult && (
          <div className="flex justify-center">
            {[
              { label: "Un", gender: "m" },
              { label: "Une", gender: "f" },
            ].map((answer) => {
              return (
                <button
                  key={answer.gender}
                  className="bg-gray-800 text-2xl text-white rounded-2xl p-5 mx-3 w-24 hover:bg-black"
                  onClick={() => handleAnswer(answer.gender)}
                >
                  {answer.label}
                </button>
              );
            })}
          </div>
        )}

        {currentRoundResult && (
          <div className="text-5xl">
            {currentRoundResult === "right" ? (
              <GiCheckMark className="text-green-500" />
            ) : (
              <AiOutlineClose className="text-red-500" />
            )}
          </div>
        )}

        {currentRoundResult && (
          <button
            className="absolute bottom-2 right-2 bg-blue-500 rounded-md text-white px-4 py-auto h-8 hover:bg-blue-300 shadow-md text-lg"
            onClick={handleNext}
          >
            {currentRound === chosenNumberOfWords ? "Show Results" : "Next"}
          </button>
        )}
      </React.Fragment>
    );
  };

  const FinalScore = () => {
    const getSentence = () => {
      const normalizedScore = Math.floor((10 * score) / chosenNumberOfWords);
      switch (normalizedScore) {
        case 0:
        case 1:
        case 2:
          return "It is ok, keep practicing!";
        case 3:
        case 4:
          return "You will surely pass the average the next time";
        case 5:
        case 6:
          return "Keep up the good work";
        case 7:
        case 8:
          return "Very nice!";
        case 9:
        case 10:
          return "I bet a french won't do better!";
        default:
          return "";
      }
    };
    return (
      <div className="flex flex-col items-center">
        <p className="text-2xl text-black dark:text-white">Final score</p>
        <div className="bg-gray-800 text-2xl text-white rounded-full p-5 text-center my-4">{`${score}/${chosenNumberOfWords}`}</div>
        <p className="italic text-lg text-black dark:text-white">
          <span>&ldquo;</span>
          {getSentence()}
          <span>&rdquo;</span>
        </p>
        <div className="flex mt-6">
          <button
            className="bg-blue-500 rounded-md text-white  py-auto h-8 hover:bg-blue-600 shadow-md text-lg w-40 mx-2"
            onClick={handleReplay}
          >
            Play again
          </button>
          <Link to="/">
            <button className="bg-red-500 rounded-md text-white py-auto h-8 hover:bg-red-600 shadow-md text-lg w-40 mx-2">
              Quit
            </button>
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div className="mt-20 mx-auto w-full lg:w-1/2 px-3">
      <div className="w-full flex flex-col bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 space-y-6 items-center relative">
        {chosenNumberOfWords && arrayOfWords ? (
          currentRound > chosenNumberOfWords ? (
            <FinalScore />
          ) : (
            <Round />
          )
        ) : (
          <Intro
            onNumberChosen={(number) => {
              setChosenNumberOfWords(number);
            }}
          />
        )}
      </div>
    </div>
  );
};
export default Quiz;
