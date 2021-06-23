import '../../css/todo.scss';
import React, { useEffect, useState } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import IF  from './if'
import useFetch from '../Hooks/use-fetch'
import newDate from '../../handleFunction/set-date' 
import {Container, Row, Col} from 'react-bootstrap'
const todoAPI = 'https://api-server402.herokuapp.com/todo';

const ToDo = () => {

  const { api, isLoading, finishLoading } = useFetch()
  const [list, setList] = useState([])
  const [showUpdate, setShowUpdate] = useState(false)
  const [updatedItem, setUpdatedItem] = useState({}) 

  
  const handleUpdate = async (item) => {
    let newItem = await api('put', `${todoAPI}/${updatedItem._id}`, item)
    console.log(newItem);
    setList(list.map(listItem => listItem._id === updatedItem._id ? newItem : listItem));
    
    setShowUpdate(false)
  }

  const handleRemove = async id => {
    const newList = list.filter(el => el._id !== id)
    setList(newList)
    await api('delete', `${todoAPI}/${id}`)
  }

  const show = (item) => {
    showUpdate? setShowUpdate(false) : setShowUpdate(true)
    setUpdatedItem(item)
  }

  const _addItem = async (item) => {
    item.complete  = false
    item.date =newDate();
    await api('post', todoAPI, item)
    setList([...list, item])
  };


  const _toggleComplete = async id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {

      item.complete = !item.complete;
      const newItem = await api('put',`${todoAPI}/${id}`, item)
      setList(list.map(listItem => listItem._id === item._id ? newItem : listItem));

    }
  };

  const _getTodoItems =  () => {
    const get = async () => {
      let newList= await api('get', todoAPI)
      setList(newList)
    }
    get()
  };
  useEffect(_getTodoItems , []);

  return (
    <>
    <Container>
      <Row>
        <Col sm={6}>
            <TodoForm handleSubmit={_addItem}
             showUpdate={showUpdate}
             updatedItem={updatedItem}
             handleUpdate={handleUpdate}
             />
        
        </Col>
        <Col sm={6}>
             <p>
               There are {list.filter(item => !item.complete).length} Items To Complete
             </p>
      <section className="todo">

        <section className="todo">

          <div>
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
        </Col>
      </Row>
    </Container>

    </>
  );
};

export default ToDo;
