import { applyMiddleware, createStore } from "redux";
import rootReducer, { history as browserHistory } from "./reducers";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "connected-react-router";

const configureStore = () =>
  createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, routerMiddleware(browserHistory))
  );
export default configureStore();
export const history = browserHistory;
