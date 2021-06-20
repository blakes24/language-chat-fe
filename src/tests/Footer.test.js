import { render } from "@testing-library/react";
import Footer from "../components/navigation/Footer";

test("renders without crashing", () => {
  render(<Footer />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});
