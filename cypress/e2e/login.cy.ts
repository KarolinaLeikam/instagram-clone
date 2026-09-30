describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('успешный логин редиректит на фид', () => {
    cy.intercept('POST', 'http://localhost:4000/auth/login', {
      statusCode: 200,
      body: { token: 'fake-token' },
    }).as('login');

    cy.get('input[placeholder="User Name"]').type('karolina');
    cy.get('input[placeholder="Password"]').type('Password1!');
    cy.contains('Log in').click();

    cy.wait('@login');
    cy.url().should('include', '/main');
  });

  it('неверные данные показывают текст ошибки', () => {
    cy.intercept('POST', 'http://localhost:4000/auth/login', {
      statusCode: 401,
      body: { error: 'Invalid credentials' },
    }).as('loginFail');

    cy.get('input[placeholder="User Name"]').type('wronguser');
    cy.get('input[placeholder="Password"]').type('WrongPass1!');
    cy.contains('Log in').click();

    cy.wait('@loginFail');
    cy.contains('Неверный логин или пароль').should('be.visible');
    cy.url().should('include', '/login');
  });
});
