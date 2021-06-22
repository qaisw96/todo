import React from 'react';
import { useState, useEffect  } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import newDate from '../../handleFunction/set-date'
import superagent from 'superagent'
import useFetch from '../Hooks/use-fetch'


import '../../css/todo.scss';

const ToDo = (props) => {

  const [list, setList] = useState([])
  const [showUpdate, setShowUpdate] = useState(false)
  const [updatedItem, setUpdatedItem] = useState({}) 

  const addItem = (item) => {
    item.date = newDate()
    item._id = Math.random();
    item.complete = false;
    setList([ ...list, item]);
  };

  const handleRemove = id => {
    console.log(id);
    const newList = list.filter(el => el._id !== id)
    setList(newList)

  }

  const show = (item) => {
    setShowUpdate(true)
    setUpdatedItem(item)
  }
  
  
  const handleUpdate = item => {
    
    console.log('updated item',updatedItem);
    const newList = list
    if(item.text ) {
      for (let i=0; i< newList.length; i++) {
        if (newList[i]._id === updatedItem._id) {
          newList[i].text = item.text;
        }
      }
       setList(newList)
    }
    setShowUpdate(false)

  }



  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let newList = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList(newList);
    }

  };

  useEffect(async ()=> {
      let list = [
        { _id: 1, complete: false, text: 'Clean the Kitchen', difficulty: 3, assignee: 'Person A' },
        { _id: 2, complete: false, text: 'Do the Laundry', difficulty: 2, assignee: 'Person A'  },
        { _id: 3, complete: false, text: 'Walk the Dog', difficulty: 4, assignee: 'Person B'},
        { _id: 4, complete: true, text: 'Do Homework', difficulty: 3, assignee: 'Person C' },
        { _id: 5, complete: false, text: 'Take a Nap', difficulty: 1, assignee: 'Person B'  },
      ];
      setList(list);
    
  }, []);
  useEffect(()=> {
    console.log('title');
    document.title = `${
      list.filter((item) => !item.complete).length
    }`
  }, [list]);
  
  useEffect(()=> {
    setUpdatedItem({})
  }, []);

    return (
      <>
        <div>
          <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
          </h2>
        </div>

        <section className="todo">

          <div>
            <TodoForm handleSubmit={addItem}
             showUpdate={showUpdate}
             updatedItem={updatedItem}
             handleUpdate={handleUpdate}
             />
          </div>

          <div>
            <TodoList
              list={list}
              handleComplete={toggleComplete}
              handleRemove={handleRemove}
              show={show}

            />
          </div>
        </section>
      </>
    );
}

export default ToDo;
