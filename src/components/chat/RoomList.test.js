import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../helpers/mockStore";
import { Provider } from "react-redux";
import RoomList from "./RoomList";

const rooms = [
  {
    id: "1-2",
    partner: {
      id: 1,
      name: "Brady",
      bio: "Eos nobis autem sint ducimus illo.",
      imageUrl: "https://cdn.fakercloud.com/avatars/happypeter1983_128.jpg",
      active: true,
      speaks: [
        {
          code: "it",
          language: "Italian",
        },
      ],
      learning: [
        {
          code: "ko",
          language: "Korean",
          level: "2",
        },
      ],
    },
  },
];

test("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RoomList rooms={rooms} />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <RoomList rooms={rooms} />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});
