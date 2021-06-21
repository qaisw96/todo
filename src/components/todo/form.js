import React from 'react';
import {useState} from 'react'
import IF from './if'

const TodoForm = (props) =>  {
  const [item, setItem] = useState({})

  const handleInputChange = e => {
    setItem({ ...item, [e.target.name]: e.target.value });
    console.log(item);
  };

  const handleSubmit = (e) => {
    const checkAddOrUpdate = e.target.go.value
    checkAddOrUpdate === 'add' ? props.handleSubmit(item) : props.handleUpdate(item)
    e.preventDefault();
    e.target.reset();
    setItem({});
  };

    return (
      <>
        <h3>Add Item</h3>
        <form onSubmit={handleSubmit}>
          <label>
            <span>To Do Item</span>
            <input
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
          </label>
          <label>
            <span>Difficulty Rating</span>
            <input defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
          </label>
          <label>
            <span>Assigned To</span>
            <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
          </label>
          <button name="go" value="add">Add Item</button>
        </form>
        <IF condition={props.showUpdate}>
          <form onSubmit={handleSubmit} className="updatedForm" >
            <span>Task :</span>
            <input
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
              defaultValue={props.updatedItem.text}
            />
            <span>Difficulty :</span>
            <input defaultValue={props.updatedItem.difficulty} type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
            <span>Assignee :</span>
            {/* <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} /> */}

            <button name="go" value="update">update Item</button>

          </form>
        </IF>

      </>
    );
}

export default TodoForm;




