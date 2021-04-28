import { Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import Profile from "./Profile";
import Partners from "./Partners";
import Messages from "./Messages";
import Signup from "./Signup";

function Routes() {
  let user;
  return (
    <>
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
    </>
  );
}

export default Routes;
