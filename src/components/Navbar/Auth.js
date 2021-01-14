import React from "react";
import { FaGoogle, FaCheck, FaExclamation } from "react-icons/fa";
import DropDown from "../Common/DropDown";
import { showMessage } from "../Common/Message";
import firebaseApp from "../../firebase/firebaseApp";
import firebase from "firebase/app";
import "firebase/auth";
const Auth = ({ user }) => {
  const signIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        showMessage({
          color: "green-500",
          bg: "white",
          text: "Succesfully signed in",
          icon: <FaCheck />,
        });
      })
      .catch((err) => {
        showMessage({
          color: "red-500",
          bg: "white",
          text: "Error while signing in",
          icon: <FaExclamation />,
        });
      });
  };
  const signOut = () => {
    firebaseApp
      .auth()
      .signOut()
      .then(() => {
        showMessage({
          color: "green-500",
          bg: "white",
          text: "Succesfully signed out",
          icon: <FaCheck />,
        });
      });
  };

  const UserAvatar = () => {
    const userInfo = (
      <div>
        <p className="font-bold">{user.displayName}</p>
        <p className="text-xs">{user.email}</p>
      </div>
    );
    return (
      <DropDown
        options={[
          { content: userInfo, func: null },
          { content: "Sign Out", func: signOut },
        ]}
      >
        <button className="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white p-2">
          <span>{`${user.displayName[0]}${
            user.displayName.split(" ")[1][0]
          }`}</span>
          <span className="sr-only">Open user menu</span>
        </button>
      </DropDown>
    );
  };
  const SignInButton = () => {
    return (
      <React.Fragment>
        <button
          className="bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white text-sm rounded-md px-4 py-2 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white flex space-x-2 items-center"
          onClick={signIn}
        >
          <span className="text-lg">
            <FaGoogle />
          </span>
          <span>Sign in with Google</span>
        </button>
        {/* <Notification text="signed in" color="white" icon={} /> */}
      </React.Fragment>
    );
  };
  return (
    <div className="mt-4 md:mt-0">
      {user ? <UserAvatar /> : <SignInButton />}
    </div>
  );
};
export default Auth;
