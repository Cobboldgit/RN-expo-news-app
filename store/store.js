import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import appReducer from "./reducers/appReducer";
import firebase from "../firebase/firebase";
import {
  getFirebase,
  reduxReactFirebase,
  firebaseReducer,
} from "react-redux-firebase";
import { getFirestore, reduxFirestore } from "redux-firestore";
import thunk from "redux-thunk";

const reducers = combineReducers({
  appReducer,
  firebaseReducers: firebaseReducer,
});

export default createStore(
  reducers,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxReactFirebase(firebase),
    reduxFirestore(firebase)
  )
);
