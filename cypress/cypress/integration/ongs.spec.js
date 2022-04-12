/// <reference types="cypress" />

describe('Ongs', () => {
  it('devem poder realizar cadastro', () => {

    cy.visit('http://localhost:3000/register');

    // cy-get - busca um elemento
    //.type - insere um texto
    cy.get('[data-cy="name"]').type('Dogs queridos');
    cy.get('[data-cy="email"]').type('dogs@gmail.com');
    cy.get('[data-cy="whatsapp"]').type('7488888888');
    cy.get('[data-cy="city"]').type('São Paulo');
    cy.get('[data-cy="uf"]').type('SP');


    //routing
    // start server com vy.server
    //cria uma rota com cy.route()
    //atribui rota com um alias
    //esperar com cy.wait e fazer validação

    cy.route('POST', '**/ongs').as('postOng');

    cy.get(' [data-cy=submit]').click();

    cy.wait('@postOng').then((xhr) => {
      expect(xhr.status).be.eq(200);
      expect(xhr.response.body).has.property('id');
      expect(xhr.response.id).is.not.null;
    })

  });

  it('deve poder realizar um login no sistema', () => {


    const createOngId = Cypress.env('createOngId');

    cy.log(createOngId)
    cy.visit('http://localhost:3000/');

    cy.get('input').type(createOngId);

    cy.get('.button').click();
  });
})