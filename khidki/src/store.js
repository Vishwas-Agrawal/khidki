import reducer from "../src/redux/reducers/reducer";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persister =  () => {
  try {
    console.log(localStorage);
    const token =  localStorage.getItem("jwt");
    const user =  JSON.parse(localStorage.getItem("user"));    
    if (token === null) {
      return undefined;
    }     
    return { _id: user._id, name: user.name, token:token, email:user.email };
  } catch (err) {
    return undefined;
  }
};
const persistedState = persister();
const store = createStore(
  reducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
