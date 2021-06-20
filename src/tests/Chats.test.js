import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { store } from "../helpers/mockStore";
import { Provider } from "react-redux";
import Chats from "../components/chat/Chats";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Chats />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Chats />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
