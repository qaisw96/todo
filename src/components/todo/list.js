import React from 'react';
import '../../css/list.scss'
import {Card} from 'react-bootstrap'
import {Badge} from 'react-bootstrap'
const TodoList = (props) => {
  
    return (
      <div>
         {props.list.map(item => (
        <Card className="card" style={{ width: '18rem' }} >
          <Card.Body>
            <div className="card-header">
              <Badge className="grabbing"   onClick={() => props.handleComplete(item._id)} variant={item.complete? 'secondary' : 'primary'}>{item.complete ? 'complete' : 'pending'}</Badge>
              <p >{item.text} </p>
            </div>

          <p >{item.text} </p>
          
          <p>{item.date}  </p>
          <button onClick={() => props.handleRemove(item._id)} >X</button>
          <button onClick={() => props.show(item)} >Update</button>
          </Card.Body>
        </Card>
         ))}
      </div>
    );
}

export default TodoList;
