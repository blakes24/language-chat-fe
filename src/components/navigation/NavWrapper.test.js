import { render } from "@testing-library/react";
import NavWrapper from "./NavWrapper";
import { MemoryRouter } from "react-router";
import { store } from "../../helpers/mockStore";
import { Provider } from "react-redux";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NavWrapper />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <NavWrapper />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
