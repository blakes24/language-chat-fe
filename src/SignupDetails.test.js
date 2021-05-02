import { render } from "@testing-library/react";
import SignupDetails from "./SignupDetails";

test("renders without crashing", () => {
  render(<SignupDetails />);
});
