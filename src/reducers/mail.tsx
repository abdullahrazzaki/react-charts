import { AnyAction } from "redux";
import { FETCH_DATA_SUCCESS } from "../actions/apiActions";
import { LOGOUT } from "../actions/login";
export default (state = {}, action: AnyAction) => {
  console.log("search Action", action.type, action);
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return action.data;
    case LOGOUT:
      return {};
    default:
      return state;
  }
};
