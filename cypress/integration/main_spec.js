describe("Log in", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("lets a user log in and out", () => {
    cy.intercept("POST", "/auth/token").as("login");
    cy.contains("Log In").click();

    // Should be on a new URL which includes '/login'
    cy.url().should("include", "/login");

    cy.get("#email")
      .type("nico1@mail.com")
      .should("have.value", "nico1@mail.com");

    cy.get("#password").type("nico1pw{enter}");

    cy.get(".MuiCircularProgress-svg").should("be.visible");
    // wait for login response
    cy.wait("@login");

    cy.get("h1").should("contain", "Find a partner");

    cy.saveLocalStorageCache();

    cy.contains("Log Out").click();
    cy.get(".MuiToolbar-root").should("contain", "Log In");
  });

  it("displays error for bad credentials", () => {
    cy.contains("Log In").click();

    cy.get("#email")
      .type("test2@mail.com")
      .should("have.value", "test2@mail.com");

    cy.get("#password").type("badpassword{enter}");

    cy.contains("Invalid email/password");
  });
});

describe("Home page", () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
    cy.visit("/");
  });

  it("navigation works", () => {
    cy.get("h1").should("contain", "Find a partner and start chatting!");

    cy.contains("Profile").click();
    cy.url().should("include", "/profile");

    cy.contains("Partners").click();
    cy.url().should("include", "/partners");

    cy.contains("Chats").click();
    cy.url().should("include", "/chats");

    cy.contains("Home").click();
    cy.get("h1").should("contain", "Find a partner and start chatting!");

    cy.get(".MuiAvatar-root").first().click();
    cy.url().should("include", "/chats");

    cy.contains("Log Out").click();
    cy.url().should("not.include", "/chats");
    cy.contains("Sign Up");
  });

  it("filters users by language", () => {
    cy.get(".MuiSelect-root").click();
    cy.get("li").contains("Italian").click();
    cy.get(".MuiCardContent-root").should("contain", "Italian");

    cy.get(".MuiSelect-root").click();
    cy.get("li").contains("Hindi").click();
    cy.get(".MuiCardContent-root").should("contain", "Hindi");
  });
});

describe("Sign up", () => {
  it("lets a user sign up and delete account", () => {
    cy.visit("/");
    cy.contains("Sign Up").click();

    cy.url().should("include", "/signup");

    cy.get("#email")
      .type("tester@mail.com")
      .should("have.value", "tester@mail.com");
    cy.get("#password").type("testpw{enter}");

    cy.get("#name").type("test").should("have.value", "test");
    cy.get("#bio").type("stuff").should("have.value", "stuff");
    cy.get("#mui-component-select-speaksLang").click();
    cy.contains("English").click();
    cy.get("#mui-component-select-learnsLang").click();
    cy.contains("French").click();
    cy.get("#mui-component-select-learnsLevel").click();
    cy.contains("Beginner").click();
    cy.contains("Create Account").click();

    cy.location("pathname", { timeout: 10000 }).should(
      "not.include",
      "/signup"
    );
    cy.contains("Profile").click();
    cy.get("h1").should("contain", "test");
    cy.contains("Delete Account").click();
    cy.get("#delete").click();

    cy.location("pathname", { timeout: 10000 }).should(
      "not.include",
      "/profile"
    );
    cy.get("body").should("contain", "Practice with native speakers");
  });

  it("displays error for missing credentials", () => {
    cy.visit("/signup");
    // enter password but no email
    cy.get("#password").type("password{enter}");
    cy.get("#email-helper-text").should("contain", "Required");
  });
});

describe("Edit Profile", () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
    cy.visit("/");
  });

  it("lets a user edit profile", () => {
    cy.contains("Profile").click();

    cy.get("h1").should("contain", "Nico");
    cy.get("body").should("contain", "User Details");

    cy.get("button[aria-label='edit user details']").click();
    cy.get("#form-dialog-title").should("contain", "Edit Profile");
    cy.get("#bio")
      .clear()
      .type("stuff about me")
      .should("contain", "stuff about me");
    cy.contains("Save Changes").click();

    cy.get("body").should("contain", "stuff about me");
  });

  it("lets a user toggle active status", () => {
    cy.contains("Profile").click();

    cy.get("body").should("contain", "active");
    cy.get(".MuiSwitch-input").click();
    cy.get("body").should("contain", "away");
    cy.get(".MuiSwitch-input").click();
    cy.get("body").should("contain", "active");
  });

  it("lets a user edit languages", () => {
    cy.contains("Profile").click();

    cy.get("[aria-label='edit native language']").click();
    cy.get("#mui-component-select-speaks").click();
    cy.get("li").contains("Korean").click();
    cy.contains("Save Changes").click();
    cy.get("body").should("contain", "Native Language: Korean");

    cy.get("[aria-label='edit native language']").click();
    cy.get("#mui-component-select-speaks").click();
    cy.get("li").contains("Russian").click();
    cy.contains("Save Changes").click();
    cy.get("body").should("contain", "Native Language: Russian");
  });
});

describe("Partners", () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
    cy.visit("/");
  });

  it("lets a user add and view partners", () => {
    cy.get("button[aria-label='add partner']").first().click();
    cy.get("[role='alert']").should("be.visible");

    cy.contains("Partners").click();
    cy.get("h1").should("contain", "Partners");
    cy.get("body").should("not.contain", "No partners yet");
  });
});

describe("Chats", () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
    cy.visit("/");
  });

  it("lets a user select a chat partner and send message", () => {
    cy.get("[aria-label='chat']").first().click();
    cy.url().should("include", "/chats");

    cy.get("[aria-label='send']").should("be.disabled");
    cy.get("#message").type("hola").should("have.value", "hola");

    cy.get("[aria-label='send']").should("not.be.disabled");
  });
});

describe("Redirects", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("redirects from protected routes if not logged in", () => {
    cy.visit("/profile");
    cy.url().should("not.include", "/profile");
    cy.get("body").should("contain", "Practice with native speakers");

    cy.visit("/chats");
    cy.url().should("not.include", "/chats");
    cy.get("body").should("contain", "Practice with native speakers");

    cy.visit("/partners");
    cy.url().should("not.include", "/partners");
    cy.get("body").should("contain", "Practice with native speakers");
  });

  it("displays 404 page", () => {
    cy.visit("/not-a-page");
    cy.contains("Go Home").click();

    cy.url().should("not.include", "/not-a-page");
    cy.get("body").should("contain", "Practice with native speakers");
  });
});
