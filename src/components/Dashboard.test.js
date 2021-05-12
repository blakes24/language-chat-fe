import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Dashboard from "./Dashboard";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(<Dashboard />);
  expect(asFragment()).toMatchSnapshot();
});
