import { render } from "@testing-library/react";
import VerifyEmail from "./VerifyEmail";
import { MemoryRouter, Route } from "react-router";
import { store } from "../../helpers/mockStore";
import { Provider } from "react-redux";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["verify/abcd"]}>
        <Route path="verify/:code">
          <VerifyEmail />
        </Route>
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter initialEntries={["verify/abcd"]}>
        <Route path="verify/:code">
          <VerifyEmail />
        </Route>
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
