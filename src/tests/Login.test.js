import { render } from "@testing-library/react";
import Login from "../components/auth/Login";
import { MemoryRouter } from "react-router";
import { store } from "../helpers/mockStore";
import { Provider } from "react-redux";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
