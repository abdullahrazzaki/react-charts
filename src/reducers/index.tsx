import { combineReducers, AnyAction } from "redux";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import data from "./mail";
import {
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_START,
  LOGIN_FAILED
} from "../actions/login";
import {
  FETCH_DATA_START,
  FETCH_DATA_FAILED,
  FETCH_DATA_SUCCESS
} from "../actions/apiActions";
export const history = createBrowserHistory();
const isLoggedIn = (state: any = false, action: AnyAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return true;
    case LOGOUT:
      return false;
    default:
      return state;
  }
};
const isLoading = (state: any = true, action: AnyAction) => {
  switch (action.type) {
    case FETCH_DATA_START:
    case LOGOUT:
      return true;
    case FETCH_DATA_SUCCESS:
    case FETCH_DATA_FAILED:
      return false;
    default:
      return state;
  }
};
const token = (state: object = {}, action: AnyAction) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.token;
    case LOGIN_FAILED:
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  router: connectRouter(history),
  data,
  isLoggedIn,
  isLoading,
  token
});
