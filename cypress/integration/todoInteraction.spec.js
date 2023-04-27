/// <reference types="cypress" />

import generatingTodo from '../shared/functions';

describe('Interação com TODO', () => {
    before('valida que localstorage está null', () => {
        cy.clearLocalStorage().should(ls => {
            expect(ls.getItem('react-todos')).to.be.null;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('Criar todo', () => {
        let nameTodo = generatingTodo();
        cy.get('input[class="new-todo"]').type(`${nameTodo}{enter}`);
        cy.get('ul[class="todo-list"]').should('exist').within(() => {
            cy.contains('li > div > label', nameTodo).should('be.visible');
        });
    });

    it('Criar vários todos', () => {
        cy.createTodos();
        cy.get('@arrayTodos').then((arrayTodos) => {

            cy.get('ul[class="todo-list"]').should('exist').within(() => {
                cy.get('li').should('have.length', 3);
                let textItemsTodos = [];

                cy.get('li').each((liElement) => {
                    textItemsTodos.push(liElement[0].innerText);
                }).then(() => {
                    expect(arrayTodos).to.deep.equal(textItemsTodos);
                })
            });
        });
    });

    it('Editar todo', () => {
        let nameTodoEdit = generatingTodo();
        cy.get('input[class="new-todo"]').as('inputTodo')
            .type(`${nameTodoEdit}{enter}`);

        cy.contains('label', nameTodoEdit)
            .dblclick();

        cy.get(`input[value="${nameTodoEdit}"]`).clear()
            .type('TODO EDITADO - 123{enter}');

        cy.get(`label`).should('have.text', 'TODO EDITADO - 123');
    });

    it('Remover todo', () => {
        cy.createTodos();

        cy.get('ul[class="todo-list"] > li').should('have.length', 3);
        cy.get('li > div').eq(0).within(() => {
            cy.get('button[class="destroy"]').click({force:true});
        })
        cy.get('ul[class="todo-list"] > li').should('have.length', 2)
    });

});