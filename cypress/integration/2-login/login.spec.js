/// <reference types="cypress" />
import faker from 'faker';

describe('Login', () => {
  it('should be able to access sign-in page', () => {
    cy.visit('http://localhost:3000/');

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should receive a message when not inserting any info', () => {
    cy.visit('http://localhost:3000/');
    cy.get('button').click();
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should receive a message when not inserting email', () => {
    cy.visit('http://localhost:3000/');

    const password = faker.internet.password();

    cy.get('input[type=password]').type(password);

    cy.get('button').click();
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should receive a message when not inserting password', () => {
    cy.visit('http://localhost:3000/');

    const email = faker.internet.email();

    cy.get('input[type=email]').type(email);

    cy.get('button').click();
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should receive a message when the email is not registered', () => {
    cy.visit('http://localhost:3000/');

    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);

    cy.get('button').click();
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should receive a message when the email is not registered', () => {
    cy.visit('http://localhost:3000/');

    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);

    cy.get('button').click();
    cy.wait(500);
    cy.get('.swal2-confirm').click();

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should receive a message when the password is incorrect', () => {
    cy.visit('http://localhost:3000/');

    const username = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const wrongPassword = faker.internet.password();

    cy.signUp(username, email, password);

    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(wrongPassword);

    cy.get('button').click();

    cy.url().should('equal', 'http://localhost:3000/');
  });

  it('should be redirected to /home when successfully login', () => {
    cy.visit('http://localhost:3000/');

    const username = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();

    cy.signUp(username, email, password);

    cy.get('input[type=email]').type(email);
    cy.get('input[type=password]').type(password);

    cy.get('button').click();

    cy.url().should('equal', 'http://localhost:3000/home');
  });
});
