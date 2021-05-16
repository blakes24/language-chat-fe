import { render } from "@testing-library/react";
import Login from "./Login";
import { UserProvider } from "../helpers/testUser";
import { MemoryRouter } from "react-router";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
        <UserProvider>
          <Login />
        </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <Login />
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});