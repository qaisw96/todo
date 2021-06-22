import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import superagent from 'superagent'
import '../../css/todo.scss';
import useFetch from '../Hooks/use-fetch'
import IF  from './if'
const todoAPI = 'https://api-js401.herokuapp.com/api/v1/todo';



const ToDo = () => {

  const { data, isLoading, finishLoading } = useFetch(todoAPI)
  const [list, setList] = useState([])

  const [showUpdate, setShowUpdate] = useState(false)

  const show = (item) => {
    setShowUpdate(true)
    // setUpdatedItem(item)
  }


  const _addItem = (item) => {
    item.due = new Date();
    fetch(todoAPI, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    })
      .then(response => response.json())
      .then(savedItem => {
        setList([...list, savedItem])
      })
      .catch(console.error);
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

  const _getTodoItems = async () => {
    // setList([])
    // let res = await superagent.get(todoAPI)
    // const headers = res.headers
    // const results = res.body
    // setList(data)
    console.log('reloading');
    // fetch(todoAPI, {
    //   method: 'get',
    //   mode: 'cors',
    // })
    //   .then(data => data.json())
    //   .then(data => {

    //   })
    //   .catch(console.error);
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
            //  showUpdate={showUpdate}
            //  updatedItem={updatedItem}
            //  handleUpdate={handleUpdate}
             />
          </div>
          <IF condition={finishLoading}>
            <div>
              <TodoList
                list={data}
                handleComplete={_toggleComplete}
                // handleRemove={handleRemove}
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
