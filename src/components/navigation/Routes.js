import { Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from "react";
import Login from "../auth/Login";
import Dashboard from "../home/Dashboard";
import LandingPage from "../home/LandingPage";
import Profile from "../profile/Profile";
import Partners from "../user/Partners";
import Chats from "../chat/Chats";
import Signup from "../auth/Signup";
import ChatApi from "../../helpers/api";
import jwtDecode from "jwt-decode";
import NavWrapper from "../navigation/NavWrapper";
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentUser } from "../../store/usersSlice";
import { logoutUser } from "../../store/logout";
import NotFound from "./NotFound";
import VerifyEmail from "../auth/VerifyEmail";

function Routes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users?.current);
  const token = useSelector((state) => state.users?.token);

  // if token is present get user details, if not remove user from state
  useEffect(() => {
    async function getUser() {
      if (!token) {
        dispatch(logoutUser());
      } else {
        try {
          ChatApi.token = token;
          const userId = jwtDecode(token).userId;
          dispatch(fetchCurrentUser(userId));
        } catch (err) {
          dispatch(logoutUser());
        }
      }
    }
    getUser();
  }, [token, dispatch]);

  return (
    <NavWrapper>
      <Switch>
        <Route exact path="/">
          {user ? (
            user.verified ? (
              <Dashboard />
            ) : (
              <Redirect to="/verify" />
            )
          ) : (
            <LandingPage />
          )}
        </Route>
        <Route exact path="/profile">
          {user && user.verified ? <Profile /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/partners">
          {user && user.verified ? <Partners /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/chats/:roomId">
          {user && user.verified ? <Chats /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/chats">
          {user && user.verified ? <Chats /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/verify/:code">
          <VerifyEmail />
        </Route>
        <Route exact path="/verify">
          {user ? <VerifyEmail /> : <Redirect to="/" />}
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </NavWrapper>
  );
}

export default Routes;
