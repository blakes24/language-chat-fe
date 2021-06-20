import { render } from "@testing-library/react";
import Signup from "../components/auth/Signup";

test("renders without crashing", () => {
  render(<Signup />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Signup />);
  expect(asFragment()).toMatchSnapshot();
});
