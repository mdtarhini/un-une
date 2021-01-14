import firebaseApp from "./firebaseApp";
const database = firebaseApp.database();

export const addToFavorites = (word, variants) => {
  const userId = firebaseApp.auth().currentUser?.uid;
  if (userId && word && variants) {
    const date = new Date();

    const data = {};
    data["date"] = date.getTime();
    data["variants"] = variants;

    const updates = {};
    updates[`users/${userId}/favorites/${word}`] = data;
    return database.ref().update(updates);
  }
};
export const removeFromFavorites = (word) => {
  const userId = firebaseApp.auth().currentUser?.uid;
  if (userId && word) {
    const favRef = database.ref(`/users/${userId}/favorites/${word}`);
    return favRef.remove();
  }
};
