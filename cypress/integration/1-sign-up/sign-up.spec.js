/// <reference types="cypress" />
import faker from 'faker';

describe('Sign up', () => {
  it('should be able to access sign-up page', () => {
    cy.visit('http://localhost:3000/');
    cy.get('a').click();

    cy.url().should('equal', 'http://localhost:3000/sign-up');
  });

  it('should be able to come back to sign-in page', () => {
    cy.visit('http://localhost:3000/sign-up');
    cy.get('a').click();

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should receive a message when not inserting username', () => {
    cy.visit('http://localhost:3000/sign-up');

    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').first().type(password);
    cy.get('input[type=password]').last().type(password);

    cy.get('button').click();
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/sign-up');
  });

  it('should receive a message when not inserting email', () => {
    cy.visit('http://localhost:3000/sign-up');

    const username = faker.name.findName();
    const password = faker.internet.password();

    cy.get('input[type=text]').type(username);
    cy.get('input[type=password]').first().type(password);
    cy.get('input[type=password]').last().type(password);

    cy.get('button').click();
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/sign-up');
  });

  it('should receive a message when not inserting password', () => {
    cy.visit('http://localhost:3000/sign-up');

    const username = faker.name.findName();
    const email = faker.internet.email();

    cy.get('input[type=text]').type(username);
    cy.get('input[type=email]').type(email);

    cy.get('button').click();
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/sign-up');
  });

  it('should receive a message when passwords dont match', () => {
    cy.visit('http://localhost:3000/sign-up');

    const username = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const wrongPassword = faker.internet.password();

    cy.get('input[type=text]').type(username);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').first().type(password);
    cy.get('input[type=password]').last().type(wrongPassword);

    cy.get('button').click();
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/sign-up');
  });

  it('should be redirected to sign-in when successfully signing-up', () => {
    cy.visit('http://localhost:3000/sign-up');

    const username = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.get('input[type=text]').type(username);
    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').first().type(password);
    cy.get('input[type=password]').last().type(password);

    cy.get('button').click();

    cy.url().should('equal', 'http://localhost:3000/');
  });
});
