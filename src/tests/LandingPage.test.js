import { render } from "@testing-library/react";
import LandingPage from "../components/home/LandingPage";
import { MemoryRouter } from "react-router";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
