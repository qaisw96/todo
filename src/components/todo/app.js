import Header from './Header.js';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import ToDoConnected from './todo-connected.js';

export default () => {
    return (
      <>
        <Header/>
        <ToDoConnected />
      </>
    );
}


