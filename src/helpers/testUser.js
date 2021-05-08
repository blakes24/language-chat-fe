import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage";

const testUser = {
  id: 1,
  name: "Test",
  bio: "stuff about mae",
  email: "test@mail.com",
};

const UserProvider = ({
  children,
  user = testUser,
  setToken = () => console.log("set token"),
}) => <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;

export { UserProvider };
