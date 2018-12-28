export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILED = "FETCH_DATA_FAILED";
type Record = {
  label: string;
  count: number;
};
type ApiData = Array<Record>;

export default {};
function getFetchStartAction() {
  return { type: FETCH_DATA_START };
}
function getFetchFailedAction() {
  return { type: FETCH_DATA_FAILED };
}
function getFetchSuccessAction(
  result: {
    label: string;
    count: number;
  }[]
) {
  return { type: FETCH_DATA_SUCCESS, data: result };
}
export function getLabels() {
  return (dispatch: any, getState: () => any) => {
    dispatch(getFetchStartAction());
    new Promise(function(resolve, reject) {
      fetch(
        "/labels?token=" + encodeURIComponent(JSON.stringify(getState().token))
      )
        .then(function(response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }
          // Examine the text in the response
          response
            .json()
            .then(function(data) {
              console.log("xt");
              resolve(data);
            })
            .catch(err => console.log("Err: " + err));
        })
        .catch(function(err) {
          console.log("Fetch Error :-S", err);
          reject(err);
        });
    })
      .then(res => {
        console.log("Res: ", res);
        dispatch(getFetchSuccessAction(res as ApiData));
      })
      .catch(err => dispatch(getFetchFailedAction()));
  };
}
