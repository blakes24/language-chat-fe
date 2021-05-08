import { render } from "@testing-library/react";
import AuthForm from "./AuthForm";
import { MemoryRouter } from "react-router";

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <AuthForm />
    </MemoryRouter>
  );
});
