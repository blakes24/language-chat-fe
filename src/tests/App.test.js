import { render } from "@testing-library/react";
import App from "../App";
import { store } from "../helpers/mockStore";
import { Provider } from "react-redux";

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
