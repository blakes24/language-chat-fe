import { render } from "@testing-library/react";
import Login from "./Login";
import { UserProvider } from "../helpers/testUser";

test("renders without crashing", () => {
  render(
    <UserProvider>
      <Login />
    </UserProvider>
  );
}); 
