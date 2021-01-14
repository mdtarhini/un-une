import React from "react";
import { useState, useEffect } from "react";
import {
  AiFillRightCircle,
  AiFillDownCircle,
  AiFillDelete,
} from "react-icons/ai";
import { MdClose } from "react-icons/md";
import Modal from "../Common/Modal";
import { removeFromFavorites } from "../../firebase/favorites";

const genderDict = { m: "Un", f: "Une", mf: "Un/Une" };
const FavoriteCard = ({ word, variants, filter }) => {
  const [shownDefs, setShownDefs] = useState(null);
  useEffect(() => {
    let isMounted = true;
    if (variants) {
      const numberOfVariants = variants.length;
      let initialShownDefs = {};
      for (let iVariant = 0; iVariant < numberOfVariants; iVariant++) {
        initialShownDefs[iVariant] = false;
      }
      if (isMounted) {
        setShownDefs(initialShownDefs);
      }
    }
    return () => {
      isMounted = false;
    };
  }, [variants]);

  const [modalVsibility, setModalVisibility] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const toggleDef = (index) => {
    setShownDefs((prevState) => {
      return { ...prevState, [index]: !prevState[index] };
    });
  };

  const formatWordWithFilter = (word) => {
    if (filter === "" || word.indexOf(filter) === -1) {
      return <span>{word}</span>;
    } else {
      const indexOfFilter = [
        word.indexOf(filter),
        word.indexOf(filter) + filter.length,
      ];
      return (
        <span>
          <span>{word.slice(0, indexOfFilter[0])}</span>
          <span className="text-yellow-500">
            {word.slice(indexOfFilter[0], indexOfFilter[1])}
          </span>
          <span>{word.slice(indexOfFilter[1], word.length)}</span>
        </span>
      );
    }
  };

  if (shownDefs) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-md shadow-md p-2 relative">
        <div className="flex flex-col space-y-6">
          {variants.map((variant, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  toggleDef(index);
                }}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xl text-gray-500 cursor-pointer">
                    {shownDefs[index] ? (
                      <AiFillDownCircle />
                    ) : (
                      <AiFillRightCircle />
                    )}
                  </span>
                  <p className="text-xl italic text-blue-500">
                    <span className="font-bold">{`${
                      genderDict[variant.gender]
                    } `}</span>
                    {formatWordWithFilter(word)}
                  </p>
                </div>

                {shownDefs[index] && (
                  <p className="mt-3 text-gray-700 dark:text-gray-100">
                    {variant.definition}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div
          className="absolute -top-2 -right-2 bg-red-500 text-xl text-white rounded-2xl hover:bg-red-400 shadow-md"
          onClick={() => {
            setModalVisibility(true);
          }}
        >
          <MdClose />
          <span className="sr-only">Remove from favorites</span>
        </div>
        <Modal
          visible={modalVsibility}
          onCancel={() => {
            setModalVisibility(false);
          }}
          onOk={() => {
            setModalLoading(true);
            removeFromFavorites(word).then(() => {
              // setModalVisibility(false);
            });
          }}
          icon={<AiFillDelete />}
          title={
            <span>
              Are you sure you want to remove{" "}
              <span className="text-blue-500">{word}</span> from your favorites
              ?
            </span>
          }
          okText={"Remove"}
          okColor="red"
          loading={modalLoading}
        />
      </div>
    );
  } else {
    return null;
  }
};
export default FavoriteCard;
