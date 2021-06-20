import { render } from "@testing-library/react";
import { store } from "../helpers/mockStore";
import { Provider } from "react-redux";
import ChatRoom from "../components/chat/ChatRoom";

test("renders without crashing", () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  render(
    <Provider store={store}>
      <ChatRoom />
    </Provider>
  );
});

it("matches snapshot", function () {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  const { asFragment } = render(
    <Provider store={store}>
      <ChatRoom />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
