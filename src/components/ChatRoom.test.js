import { render } from "@testing-library/react";
import { UserProvider } from "../helpers/testUser";
import store from "../store/root";
import { Provider } from "react-redux";
import ChatRoom from "./ChatRoom";

test("renders without crashing", () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  render(
    <Provider store={store}>
      <UserProvider>
        <ChatRoom />
      </UserProvider>
    </Provider>
  );
});

it("matches snapshot", function () {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const { asFragment } = render(
    <Provider store={store}>
      <UserProvider>
        <ChatRoom />
      </UserProvider>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
