import configureStore from "redux-mock-store";

const middlewares = [];
const mockStore = configureStore(middlewares);

const testUser = {
  id: 1,
  name: "Test",
  bio: "stuff about mae",
  email: "test@mail.com",
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
};

const initialState = {
  users: {
    current: testUser,
    items: [],
    token: "",
    loading: "idle",
    error: null,
  },
  rooms: { items: [], current: null, loading: "idle", error: null },
  messages: { items: [], loading: "idle", error: null },
  partners: { items: [], loading: "idle", error: null },
};

export const store = mockStore(initialState);
