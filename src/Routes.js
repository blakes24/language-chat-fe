import { Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
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

function Routes() {
  const [token, setToken] = useLocalStorage("token", "");
  const [user, setUser] = useState(null);

  // if token is present get user details, if not remove user from state
  useEffect(() => {
    async function getUser() {
      if (!token) {
        setUser(null);
      } else {
        try {
          ChatApi.token = token;
          
          let decoded = jwtDecode(token, { header: true });
          console.log(decoded);
          const userId = jwtDecode(token).userId;
          console.log(userId);
          const user = await ChatApi.getUser(userId);
          setUser(user);
        } catch (err) {
          console.error(err);
        }
      }
    }
    getUser();
  }, [token]);
  
  return (
    <UserContext.Provider value={{ user, setToken }}>
      <Navbar />
      <Switch>
        <Route exact path="/">
          {user ? <Dashboard /> : <LandingPage />}
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/partners">
          <Partners />
        </Route>
        <Route exact path="/messages">
          <Messages />
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
    </UserContext.Provider>
  );
}

export default Routes;
