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
import { fetchCurrentUser, clearUser } from "../../store/usersSlice";
import NotFound from "../NotFound";

function Routes() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.current);
  const token = useSelector((state) => state.users.token);

  // if token is present get user details, if not remove user from state
  useEffect(() => {
    async function getUser() {
      if (!token) {
        dispatch(clearUser());
      } else {
        try {
          ChatApi.token = token;
          const userId = jwtDecode(token).userId;
          dispatch(fetchCurrentUser(userId));
        } catch (err) {
          console.error(err);
        }
      }
    }
    getUser();
  }, [token, dispatch]);

  return (
    <NavWrapper>
      <Switch>
        <Route exact path="/">
          {user ? <Dashboard /> : <LandingPage />}
        </Route>
        <Route exact path="/profile">
          {user ? <Profile /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/partners">
          {user ? <Partners /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/chats/:roomId">
          {user ? <Chats /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/chats">
          {user ? <Chats /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </NavWrapper>
  );
}

export default Routes;
