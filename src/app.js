import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Header from './Header.js';
import React from 'react';


import ToDo from './components/todo/todo.js';

export default () => {
    return (
      <>
        <Header/>
        <ToDo />
      </>
    );
}

// App Component