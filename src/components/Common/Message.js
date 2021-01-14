import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
const Message = (props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }, [props]);
  if (visible) {
    return (
      <div className="w-full fixed bottom-0 left-0 flex items-center justify-center">
        <div
          className={`bg-${props.bg} text-${props.color} text-center w-80 mb-10 p-3 shadow-md rounded-sm bg-opacity-80 flex items-center justify-center`}
        >
          {props.icon && <span className="mr-2">{props.icon}</span>}
          {props.text}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export const showMessage = ({ color, bg, text, icon }) => {
  ReactDOM.render(
    <Message text={text} color={color} icon={icon} bg={bg} />,
    document.getElementById("message")
  );
};
