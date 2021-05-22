import { render } from "@testing-library/react";
import Login from "./Login";
import { MemoryRouter } from "react-router";
import store from "../../store/root";
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
