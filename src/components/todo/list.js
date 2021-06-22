import React from 'react';
import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

// import {ProgressBar} from 'react-bootstrap'
const TodoList = (props) => {


  
    return (
      <div>

      <ul>
        {props.list.map(item => (
          <li
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => props.handleComplete(item._id)}>
              <div className="task">
                <p>{item.text} </p>
                <p>{item.date}  </p>

              </div>
              <p>{item.assignee}</p>
            </span>
            <button onClick={() => props.handleRemove(item._id)} >X</button>
            <button onClick={() => props.show(item)} >Update</button>
            
          </li>
        ))}
      </ul>
      </div>

    );
}

export default TodoList;
