import faker from "faker-br";

export default function generatingTodo() { 
    return `${faker.lorem.word(3) + ' ' + faker.lorem.slug()}` 
};