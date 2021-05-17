import { render } from "@testing-library/react";
import UserCard from "./UserCard";
import { UserProvider } from "../helpers/testUser";
import { MemoryRouter } from "react-router-dom";

const user = 
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
  }

test("renders without crashing", () => {
  render(
    <MemoryRouter>
      <UserProvider>
        <UserCard cardUser={user} key={user.id} />)
      </UserProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <UserProvider>
        <UserCard cardUser={user} key={user.id} />)
      </UserProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
