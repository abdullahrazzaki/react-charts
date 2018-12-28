import { AnyAction } from "redux";
export default (state = {}, action: AnyAction) => {
  console.log("search Sction", action.type);
  switch (action.type) {
    default:
      return state;
  }
};
