import { render } from "@testing-library/react";
import NavWrapper from "./NavWrapper";
import { MemoryRouter } from "react-router";
import { UserProvider } from "../helpers/testUser";

test("renders without crashing", () => {
  render(
    <UserProvider>
      <MemoryRouter>
        <NavWrapper />
      </MemoryRouter>
    </UserProvider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <UserProvider>
      <MemoryRouter>
        <NavWrapper />
      </MemoryRouter>
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
