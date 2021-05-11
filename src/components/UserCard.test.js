import { render } from "@testing-library/react";
import UserList from "./UserList";

const users = [
  {
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
];

test("renders without crashing", () => {
  render(<UserList users={users} />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<UserList users={users} />);
  expect(asFragment()).toMatchSnapshot();
});
