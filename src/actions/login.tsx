import { getLabels } from "./apiActions";

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT = "LOGOUT";

function getLoginStartAction() {
  return { type: LOGIN_START };
}
function getLoginFailedAction() {
  return { type: LOGIN_FAILED };
}
function getLogoutAction() {
  return { type: LOGOUT };
}
function getLoginSuccessAction(token: any) {
  return { type: LOGIN_SUCCESS, token: token };
}
export function loginSuccessful(token: any) {
  return (dispatch: any) => {
    dispatch(getLoginSuccessAction(token));
    dispatch(getLabels());
  };
}
export function loginFailed() {
  return (dispatch: any) => dispatch(getLoginFailedAction());
}
export function loginStart() {
  return (dispatch: any) => dispatch(getLoginStartAction());
}
export function logout() {
  return (dispatch: any) => dispatch(getLogoutAction());
}
