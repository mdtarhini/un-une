import React from "react";
const Intro = (props) => {
  const possibleNumberOfWords = [5, 50, 100, 200];
  return (
    <React.Fragment>
      <p className="mx-auto font-bold text-gray-500 dark:text-white text-lg">
        Select the number of words in the quiz:
      </p>
      <div className="flex flex-col justify-center">
        {possibleNumberOfWords.map((number, index) => {
          return (
            <div
              className={`rounded-lg bg-gray-${
                500 + index * 100
              } px-10 py-5 md:px-20 md:py-10  shadow-md text-white font-bold text-xl m-3 hover:bg-black cursor-pointer text-center`}
              key={number}
              onClick={() => props.onNumberChosen(number)}
            >
              {`${number} words`}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};
export default Intro;
