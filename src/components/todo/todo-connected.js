import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import '../../css/todo.scss';
import useFetch from '../Hooks/use-fetch'
import IF  from './if'
import newDate from '../../handleFunction/set-date' 
const todoAPI = 'https://api-server402.herokuapp.com/todo';

const ToDo = () => {

  const { api, isLoading, finishLoading } = useFetch()
  const [list, setList] = useState([])
  const [showUpdate, setShowUpdate] = useState(false)
  

  const handleRemove =  id => {
    console.log(id);
    const newList = list.filter(el => el._id !== id)
    setList(newList)
    let deleteItem = async () => {
      await api('delete', `${todoAPI}/${id}`)
    } 
    deleteItem()
  }

  const show = (item) => {
    setShowUpdate(true)
  }
  const _addItem = (item) => {
    item.complete  = true
    item.date =newDate();
    let post = async () => {
      await api('post', todoAPI, item)
    } 
    post()
    setList([...list, item])
  };


  const _toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;

      let url = `${todoAPI}/${id}`;

      fetch(url, {
        method: 'put',
        mode: 'cors',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      })
        .then(response => response.json())
        .then(savedItem => {
          setList(list.map(listItem => listItem._id === item._id ? savedItem : listItem));
        })
        .catch(console.error);
    }
  };

  const _getTodoItems =  () => {
    const get = async () => {
      let newList= await api('get', todoAPI)
      console.log(newList);
      setList(newList)
    }
    get()
  };
  useEffect(_getTodoItems , []);

  return (
    <>
      <header>
        <h2>
          There are {list.filter(item => !item.complete).length} Items To Complete
        </h2>
      </header>

      <section className="todo">

        <section className="todo">

          <div>
            <TodoForm handleSubmit={_addItem}
             showUpdate={showUpdate}
            //  updatedItem={updatedItem}
            //  handleUpdate={handleUpdate}
             />
          </div>
          <IF condition={finishLoading}>
            <div>
              <TodoList
                list={list}

                handleComplete={_toggleComplete}
                handleRemove={handleRemove}

                show={show}

              />
            </div>

          </IF>
        </section>
      </section>
    </>
  );
};

export default ToDo;
