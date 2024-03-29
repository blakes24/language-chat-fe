describe("Sign up", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });
  it("lets a user sign up", () => {
    cy.intercept("POST", "/auth/register").as("signup");
    // cy.intercept("PATCH", "/auth/verify-email").as("verify");

    cy.visit("/");
    cy.contains("Sign Up").click();

    cy.url().should("include", "/signup");

    cy.get("#email")
      .type("cytester@mail.com")
      .should("have.value", "cytester@mail.com");
    cy.get("#password").type("cytesterpw");
    cy.get("#passwordConfirm").type("cytesterpw{enter}");

    cy.get("#name").type("test").should("have.value", "test");
    cy.get("#bio").type("stuff").should("have.value", "stuff");
    cy.get("#mui-component-select-speaksLang").click();
    cy.contains("English").click();
    cy.get("#mui-component-select-learnsLang").click();
    cy.contains("French").click();
    cy.get("#mui-component-select-learnsLevel").click();
    cy.contains("Beginner").click();
    cy.contains("Create Account").click();

    //wait for signup to return
    cy.wait("@signup");

    cy.location("pathname").should("not.include", "/signup");
    cy.get("body").should("contain", "Find a partner and start chatting!");

    // Tests for email verification (disabled)

    // cy.location("pathname").should("include", "/verify");

    // cy.get("body").should("contain", "A verification link has been sent");

    // cy.visit(
    //   "/verify/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImN5dGVzdGVyQG1haWwuY29tIiwiaWF0IjoxNjI0MDQ0MzQwfQ.OqC0KLX_oWbB_fWXN1mADAqZnvamV9zUJta-ctE82LA"
    // );

    // cy.contains("Verify").click();
    // //wait for email verification to return
    // cy.wait("@verify");
    // cy.get("body").should("contain", "Your account has been verified.");
    // cy.get(".MuiToolbar-root").should("contain", "test");
  });

  it("displays error for missing credentials", () => {
    cy.visit("/signup");
    // enter password but no email
    cy.get("#password").type("password{enter}");
    cy.get("#email-helper-text").should("contain", "Required");

    // enter wrong password confirmation
    cy.get("#passwordConfirm").type("wrong{enter}");
    cy.get("#passwordConfirm-helper-text").should(
      "contain",
      "Passwords do not match"
    );

    // add correct credentials to move to second page
    cy.get("#email").type("cytester@mail.com");
    cy.get("#passwordConfirm").clear().type("password{enter}");

    //should show required if only spaces are entered
    cy.get("#bio").type("  ");
    cy.get("#name").type("  ");
    cy.contains("Create Account").click();
    cy.get("#name-helper-text").should("contain", "Required");
    cy.get("#bio-helper-text").should("contain", "Required");
  });

  // it("displays error for invalid verification link", () => {
  //   cy.intercept("PATCH", "/auth/verify-email").as("verify");
  //   cy.visit("/verify/badlink");
  //   cy.contains("Verify").click();
  //   //wait for email verification to return
  //   cy.wait("@verify");
  //   cy.get("body").should(
  //     "contain",
  //     "Verification link is expired or invalid."
  //   );
  // });
});

describe("Log in", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");
  });
  it("lets a user log in and out", () => {
    cy.intercept("POST", "/auth/token").as("login");
    cy.contains("Log In").click();

    // Should be on a new URL which includes '/login'
    cy.url().should("include", "/login");

    cy.get("#email")
      .type("cytester@mail.com")
      .should("have.value", "cytester@mail.com");
    cy.get("#password").type("cytesterpw{enter}");

    cy.get(".MuiCircularProgress-svg").should("be.visible");
    // wait for login response
    cy.wait("@login");

    cy.get("h1").should("contain", "Find a partner");

    cy.get(".MuiToolbar-root").should("contain", "test");

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

describe("Redirects", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
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

    cy.visit("/verify");
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

    cy.get("[aria-label='chat']").first().click();
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

describe("Partners", () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
    cy.visit("/");
  });

  it("lets a user add and view partners", () => {
    cy.contains("Partners").click();
    cy.get("h1").should("contain", "Partners");
    cy.get("body").should("contain", "No partners yet");

    cy.contains("Home").click();
    cy.get("h1").should("contain", "Find a partner and start chatting!");
    cy.get(".MuiSelect-root").click();
    cy.get("li").contains("Any").click();

    cy.get("button[aria-label='add partner']").first().click();
    cy.get("[role='alert']").should("be.visible");

    cy.contains("Partners").click();
    cy.get("h1").should("contain", "Partners");
    cy.get("body").should("not.contain", "No partners yet");
  });

  it("lets a user delete a partner", () => {
    cy.contains("Partners").click();
    cy.get("body").should("not.contain", "No partners yet");

    cy.get("button[aria-label='delete partner']").first().click();
    cy.get("body").should("contain", "No partners yet");
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

describe("Edit Profile", () => {
  beforeEach(() => {
    cy.restoreLocalStorageCache();
    cy.visit("/");
  });

  it("lets a user edit profile", () => {
    cy.contains("Profile").click();

    cy.get("h1").should("contain", "test");
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

    cy.get("[aria-label='edit learning language']").click();
    cy.get("#mui-component-select-learning").click();
    cy.get("li").contains("Russian").click();
    cy.contains("Save Changes").click();
    cy.get("body").should("contain", "Learning: Russian");
  });

  it("lets a user delete their profile", () => {
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
});
