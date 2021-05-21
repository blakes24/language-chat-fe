import UserContext from "./UserContext";

const testUser = {
  id: 1,
  name: "Test",
  bio: "stuff about mae",
  email: "test@mail.com",
  imageUrl: "https://cdn.fakercloud.com/avatars/happypeter1983_128.jpg",
  active: true,
  speaks: [
    {
      code: "it",
      language: "Italian",
    },
  ],
  learning: [
    {
      code: "ko",
      language: "Korean",
      level: "2",
    },
  ],
};

const UserProvider = ({
  children,
  user = testUser,
  setToken = () => console.log("set token"),
}) => <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;

export { UserProvider };
