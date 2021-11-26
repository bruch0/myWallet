/// <reference types="cypress" />
import faker from 'faker';

describe('Transactions', () => {
  it('should be able to access transactions page', () => {
    cy.visit('http://localhost:3000/');

    const username = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.goToTransaction(username, email, password);

    cy.contains('Nova entrada');
    cy.contains('Nova saída');

    cy.url().should('equal', 'http://localhost:3000/home');
  });

  it('should be able to access register transaction page', () => {
    cy.visit('http://localhost:3000/');

    const username = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.goToTransaction(username, email, password);

    cy.contains('Nova entrada').click();

    cy.url().should('equal', 'http://localhost:3000/transaction?type=input');
  });

  it('should be able to access register a new income', () => {
    cy.visit('http://localhost:3000/');

    const username = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.goToTransaction(username, email, password);

    cy.contains('Nova entrada').click();

    cy.get('input[type=tel]').type(faker.datatype.number());
    cy.get('input[type=text]').type(faker.datatype.string(10));

    cy.contains('Salvar').click();
    cy.wait(500);
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/home');
  });

  it('should be able to access register a new outcome', () => {
    cy.visit('http://localhost:3000/');

    const username = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.goToTransaction(username, email, password);

    cy.contains('Nova saída').click();

    cy.get('input[type=tel]').type(faker.datatype.number());
    cy.get('input[type=text]').type(faker.datatype.string(10));

    cy.contains('Salvar').click();
    cy.wait(500);
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/home');
  });
});
