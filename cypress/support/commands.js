import generatingTodo from "../shared/functions";

Cypress.Commands.add('seedLocalStorage', () => {
    cy.window().then((win) => {
        cy.fixture('../fixtures/todos.json').then((todos) => {
            // console.log('todos: ', todos)
            win.localStorage.setItem( 'react-todos', JSON.stringify(todos) )
        })
    })
});

Cypress.Commands.add('createTodos', () => {
    let todos = [];
    Cypress._.times(3, () => {
        const todo = generatingTodo();
        cy.get('input[class="new-todo"]').type(`${todo}` + `{enter}`);
        todos.push(todo);
    })
    cy.wrap(todos).as('arrayTodos');
});