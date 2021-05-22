import { render } from "@testing-library/react";
import Partners from "./Partners";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../helpers/mockStore";
import { Provider } from "react-redux";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Partners />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Partners />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
