import { render } from "@testing-library/react";
import { UserProvider } from "../helpers/testUser";
import { MemoryRouter } from "react-router-dom";
import store from "../store/root";
import { Provider } from "react-redux";
import Chats from "./Chats";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <UserProvider>
          <Chats />
        </UserProvider>
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <UserProvider>
          <Chats />
        </UserProvider>
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
