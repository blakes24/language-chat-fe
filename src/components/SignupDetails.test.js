import { render } from "@testing-library/react";
import SignupDetails from "./SignupDetails";
import { UserProvider } from "../helpers/testUser";

test("renders without crashing", () => {
  render(
    <UserProvider>
      <SignupDetails />
    </UserProvider>
  );
});
