describe("Log in", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("lets a user log in and out", () => {
    cy.contains("Log In").click();

    // Should be on a new URL which includes '/login'
    cy.url().should("include", "/login");

    cy.get("#email")
      .type("nico1@mail.com")
      .should("have.value", "nico1@mail.com");

    cy.get("#password").type("nico1pw{enter}");

    cy.get("h1").should("contain", "Find a partner");

    cy.contains("Log Out").click();
    cy.contains("Sign Up");
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
    cy.visit("/login");
    cy.get("#email").type("nico1@mail.com");
    cy.get("#password").type("nico1pw{enter}");
  });

  it("navigation works", () => {
    cy.get("h1").should("contain", "Find a partner and start chatting!");

    cy.contains("Profile").click();
    cy.url().should("include", "/profile");

    cy.contains("Partners").click();
    cy.url().should("include", "/partners");

    cy.contains("Home").click();
    cy.get("h1").should("contain", "Find a partner and start chatting!");

    cy.contains("Chats").click();
    cy.url().should("include", "/chats");

    cy.contains("Log Out").click();
    cy.url().should("not.include", "/chats");
    cy.contains("Sign Up");
  });

  it("filters users by language", () => {
    cy.get(".MuiSelect-root").click();
    cy.get("li")
      .contains("Italian")
      .click()
      .then(() => {
        cy.get(".MuiCardContent-root").should("contain", "Italian");
      });
  });
});
