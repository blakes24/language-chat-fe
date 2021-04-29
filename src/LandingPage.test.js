import { render } from "@testing-library/react";
import LandingPage from "./LandingPage";

test("renders without crashing", () => {
  render(<LandingPage />);
});
