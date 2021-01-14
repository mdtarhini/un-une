import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Search from "./components/Search/Search";
import Quiz from "./components/Quiz/Quiz";
import Favorites from "./components/Favorites/Favorites";
import firebaseApp from "./firebase/firebaseApp";
import _ from "lodash";

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const toggleDarkTheme = () => {
    setDarkTheme(!darkTheme);
  };
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState(null);

  const addOneTavorites = (word, variants) => {
    setFavorites((prevState) => {
      return { ...prevState, [word]: variants };
    });
  };
  const deleteOneFromFavorites = (word) => {
    setFavorites((prevState) => {
      return _.omit(prevState, word);
    });
  };
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(function (firebaseUser) {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    let favoritesRef;

    const database = firebaseApp.database();

    if (user) {
      //fetch notifications
      favoritesRef = database.ref(`users/${user.uid}/favorites`);

      favoritesRef.on("child_added", (data) => {
        addOneTavorites(data.key, data.val());
      });
      favoritesRef.on("child_changed", (data) => {
        addOneTavorites(data.key, data.val());
      });
      favoritesRef.on("child_removed", (data) => {
        deleteOneFromFavorites(data.key);
      });

      return () => {
        favoritesRef.off();
      };
    }
  }, [user]);

  return (
    <div className={`${darkTheme ? "dark" : ""}`}>
      <div className="h-screen overflow-auto bg-gray-100 dark:bg-black">
        <BrowserRouter>
          <Route
            path="/"
            render={(props) => (
              <Navbar
                {...props}
                user={user}
                toggleDarkTheme={toggleDarkTheme}
                darkTheme={darkTheme}
              />
            )}
          />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => (
                <Search {...props} user={user} favorites={favorites} />
              )}
            />
            <Route path="/quiz" component={Quiz} />
            {user && (
              <Route
                path="/favorites"
                render={(props) => (
                  <Favorites {...props} user={user} favorites={favorites} />
                )}
              />
            )}
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
