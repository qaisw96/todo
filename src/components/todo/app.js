import Header from './Header.js';
import React from 'react';


import ToDo from './todo.js';
import ToDoConnected from './todo-connected.js';

export default () => {
    return (
      <>
        <ToDoConnected/>
        <ToDo />
      </>
    );
}

// App Component