import { Route, Switch, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import Partners from "./components/Partners";
import Messages from "./components/Messages";
import Signup from "./components/Signup";
import UserContext from "./helpers/UserContext";
import useLocalStorage from "./helpers/useLocalStorage";
import ChatApi from "./helpers/api";
import jwtDecode from "jwt-decode";
import NavWrapper from "./components/NavWrapper";
import Loading from "./components/Loading";

function Routes() {
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // if token is present get user details, if not remove user from state
  useEffect(() => {
    async function getUser() {
      setLoading(true);
      if (!token) {
        setUser(null);
        setLoading(false);
      } else {
        try {
          ChatApi.token = token;
          const userId = jwtDecode(token).userId;
          const user = await ChatApi.getUser(userId);
          setUser(user);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      }
    }
    getUser();
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setToken }}>
      <NavWrapper>
        <Switch>
          <Route exact path="/">
            {loading ? <Loading /> : user ? <Dashboard /> : <LandingPage />}
          </Route>
          <Route exact path="/profile">
            {user ? <Profile /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/partners">
            {user ? <Partners /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/messages">
            {user ? <Messages /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route>
            <p>Page not found.</p>
          </Route>
        </Switch>
      </NavWrapper>
    </UserContext.Provider>
  );
}

export default Routes;
