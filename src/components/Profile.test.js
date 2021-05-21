import { render } from "@testing-library/react";
import Profile from "./Profile";
import { UserProvider } from "../helpers/testUser";
import { MemoryRouter } from "react-router-dom";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <Profile />
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Profile />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
