import { render } from "@testing-library/react";
import AuthForm from "../components/auth/AuthForm";
import { MemoryRouter } from "react-router";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <AuthForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(<AuthForm />);
  expect(asFragment()).toMatchSnapshot();
});
