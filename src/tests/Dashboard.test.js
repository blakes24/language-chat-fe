import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Dashboard from "../components/home/Dashboard";
import { store } from "../helpers/mockStore";
import { Provider } from "react-redux";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
