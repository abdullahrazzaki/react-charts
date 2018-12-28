import React, { Component } from "react";
import "./App.css";
import HCDonutChart from "./HCDonutChart/HCDonutChart";
import VisDonutChart from "./VisDonutChart/VisDonutChart";
import {
  GoogleLogin,
  GoogleLogout,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from "react-google-login";
import { connect } from "react-redux";
import { LoginActions } from "../actions";
import Loading from "./Loader/Loading";
type StateProps = {
  isLoggedIn: boolean;
  isLoading: boolean;
  data: {
    label: string;
    count: number;
  }[];
};
type DispatchProps = {
  loginStarted: () => void;
  loginSuccessful: (token: string) => any;
  loginFailed: () => void;
  logout: () => void;
};
type Props = DispatchProps & StateProps;
class App extends Component<Props> {
  constructor(props: Props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.loginSuccessful = this.loginSuccessful.bind(this);
    this.loginFailed = this.loginFailed.bind(this);
  }
  loginFailed() {
    this.props.loginFailed();
  }
  loginSuccessful(response: any) {
    console.log("Google logged in", response);
    this.props.loginSuccessful(response.tokenObj);
  }
  logout() {
    this.props.logout();
  }
  render() {
    const { isLoggedIn, isLoading, data } = this.props;
    return (
      <div className="App">
        {!isLoggedIn && (
          <GoogleLogin
            clientId="1077561447825-g17q2vul4bbvqpv6dkq53ina7q2puot7.apps.googleusercontent.com"
            buttonText="Login"
            scope="https://www.googleapis.com/auth/gmail.labels"
            onSuccess={this.loginSuccessful}
            onFailure={this.loginFailed}
          />
        )}
        {isLoggedIn &&
          ((isLoading && <Loading />) || (
            <div>
              <div className="chart">
                <HCDonutChart data={data} />
              </div>
              <div className="chart">
                <VisDonutChart data={data} />
              </div>
              <GoogleLogout buttonText="Logout" onLogoutSuccess={this.logout} />
            </div>
          ))}
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  const { isLoggedIn, data, isLoading } = state;
  return { isLoggedIn, data, isLoading };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    loginStarted: () => dispatch(LoginActions.loginStart()),
    loginSuccessful: (token: string) =>
      dispatch(LoginActions.loginSuccessful(token)),
    loginFailed: () => dispatch(LoginActions.loginFailed()),
    logout: () => dispatch(LoginActions.logout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
