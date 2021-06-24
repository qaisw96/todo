import '../../css/todo.scss';
import React, { useEffect, useState, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import IF  from './if'
import useFetch from '../Hooks/use-fetch'
import newDate from '../../handleFunction/set-date' 
import {Container, Row, Col} from 'react-bootstrap'
import { SettingContext } from '../../context/setting-manager';

const todoAPI = 'https://api-server402.herokuapp.com/todo';

const ToDo = () => {
  const context = useContext(SettingContext)
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
    !item.difficulty ? item.difficulty = 1 : item.difficulty = item.difficulty 
    item.date =newDate();
    const newItem = await api('post', todoAPI, item)
    console.log(newItem);
    setList([...list, newItem])
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
    setList(list.filter(listItem => listItem.complete == context.displayCompletedItem));
    const get = async () => {
      let newList= await api('get', todoAPI)
      setList(newList)
    }
    get()
  };
  useEffect(_getTodoItems , []);

  // useEffect(() => {
  //   console.log('useEffect');
  //   console.log(list);
  //   let newList = list.sort((c1, c2)=> c1.difficulty > c2.difficulty ? 1 : -1 ) 

  //   setList(newList)

  // }, [context.sortItems]);

  return (
    <>
    {/* {context.sortItems = 'sort' ? setList(list.sort((c1, c2)=> c1.difficulty > c2.difficulty ? 1 : -1 )) : ''} */}
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
                list={ context.sortItems === 'sort'? list.sort((c1, c2)=> c1.difficulty > c2.difficulty ? 1 : -1 ) : list }
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
