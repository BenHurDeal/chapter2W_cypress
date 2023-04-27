/// <reference types="cypress" />

import faker from 'faker-br';

describe('Interação com TODO', () => {
    before('valida que localstorage está null', () => {
        cy.clearLocalStorage().should(ls => {
            expect(ls.getItem('react-todos')).to.be.null;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });
    const generatingTodo = () => { return `${faker.lorem.word(3) + ' ' + faker.lorem.slug()}` };
    
    it('Criar todo', () => {
        let nameTodo = generatingTodo();
        cy.get('input[class="new-todo"]').type(`${nameTodo}{enter}`);
        cy.get('ul[class="todo-list"]').should('exist').within(() => {
            cy.get('li > div > label').should('contain.text', nameTodo);
        });
    });

    it('Criar vários todos', () => {
        Cypress._.times(8, () => {
            cy.get('input[class="new-todo"]').type(`${generatingTodo()}` + `{enter}`);
        });
        cy.get('ul[class="todo-list"]').should('exist').within(() => {
            cy.get('li').should('have.length', 8);
        });
    });

    it.only('Editar todo', () => {
        let nameTodoEdit = generatingTodo();
        cy.get('input[class="new-todo"]').type(`${nameTodoEdit}{enter}`);
        cy.contains('label', nameTodoEdit);
    });

    it('Remover todo', () => {

    });

    it('Criar todo', () => {

    });

});