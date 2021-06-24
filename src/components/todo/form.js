import React from 'react';
import useForm from '../Hooks/use-form'
import IF from './if'
import '../../css/form.scss'
import {Container, Row, Col, Button} from 'react-bootstrap'
import { useContext } from 'react';
import { SettingContext } from '../../context/setting-manager';


const TodoForm = (props) =>  {
    const context = useContext(SettingContext)

    const { item, handleInputChange,  handleSubmit } = useForm()

    function handleSubmitAdd(e) {
      handleSubmit(e)
      props.handleSubmit(item) 
    }

    function handleSubmitUpdate(e) {
      handleSubmit(e)
      console.log(item);
      props.handleUpdate(item) 
    }
  

    return (
      <>
        <Container>
          <Row>
            <Col>
              <h3>Add Item</h3>
              <form onSubmit={handleSubmitAdd} className="addForm">
                <label>
                <span>To Do Item</span>
                <input
                  name="text"
                  placeholder="Add To Do List Item"
                  onChange={handleInputChange}
                  required
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
                <Button variant="outline-primary" type="submit" name="go" value="add">Add Item</Button>
                <Button
                 variant="outline-primary"
                 onClick={() =>context.displayCompletedItem ? context.setDisplayCompletedItem(false) : context.setDisplayCompletedItem(true) } name="go"
                value="add">{context.displayCompletedItem? 'hide completed' : 'show completed'}</Button>
             </form>
            
            </Col>

            <Col>
              <IF condition={props.showUpdate}>
                  <h3>Update Item</h3>
                <form onSubmit={handleSubmitUpdate} className="updateForm" >
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
                  <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />

                  <button name="go" value="update">update Item</button>

                </form>
              </IF>
            </Col>
          </Row>
        </Container>

      </>
    );
}

export default TodoForm;




