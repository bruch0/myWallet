Cypress.Commands.add('signUp', (username, email, password) => {
  cy.visit('http://localhost:3000/sign-up');

  cy.get('input[type=text]').type(username);
  cy.get('input[type=email]').type(email);
  cy.get('input[type=password]').first().type(password);
  cy.get('input[type=password]').last().type(password);

  cy.get('button').click();
  cy.wait(500);
  cy.get('.swal2-confirm').click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000/');

  cy.get('input[type=email]').type(email);
  cy.get('input[type=password]').type(password);
  cy.get('button').click();

  cy.wait(500);
});

Cypress.Commands.add('goToTransaction', (username, email, password) => {
  cy.signUp(username, email, password);
  cy.login(email, password);
});
