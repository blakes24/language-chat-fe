import { render } from "@testing-library/react";
import SignupDetails from "../components/auth/SignupDetails";
import { MemoryRouter } from "react-router-dom";
import store from "../store/root";
import { Provider } from "react-redux";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SignupDetails />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <SignupDetails />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
