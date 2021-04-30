import { render } from "@testing-library/react";
import LandingPage from "./LandingPage";
import { MemoryRouter } from "react-router";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <LandingPage />
    </MemoryRouter>
  );
});
