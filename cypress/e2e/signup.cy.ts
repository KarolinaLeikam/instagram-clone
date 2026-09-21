describe('Signup', () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('успешная регистрация и переход на feed', () => {
    cy.intercept('POST', 'http://localhost:4000/auth/register', {
      statusCode: 200,
      body: { token: 'fake-token' },
    }).as('signup');

    cy.get('input[placeholder="Email"]').type('karolina@gmail.com');
    cy.get('input[placeholder="Full Name"]').type('Karolina Leikam');
    cy.get('input[placeholder="User Name"]').type('KarolinaLey');
    cy.get('input[placeholder="Password"]').type('Karolina-2001');
    cy.contains('Sign up').click();
    cy.wait('@signup');
    cy.url().should('include', '/main');
  });

  it('неуспешная регистрация', () => {
    cy.intercept('POST', 'http://localhost:4000/auth/register', {
      statusCode: 409,
      body: { error: 'Email or username already taken' },
    }).as('signupFail');

    cy.get('input[placeholder="Email"]').type('karolina@gmail.com');
    cy.get('input[placeholder="Full Name"]').type('Nikita Zabrodskii');
    cy.get('input[placeholder="User Name"]').type('KarolinaLey');
    cy.get('input[placeholder="Password"]').type('Nikita-1999');
    cy.contains('Sign up').click();
    cy.wait('@signupFail');
    cy.contains('Email or username already taken').should('be.visible');
    cy.url().should('include', '/signup');
  });
});
