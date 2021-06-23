import React from 'react';
import '../../css/list.scss'
import { useContext } from 'react';
import { SettingContext } from '../../context/setting-manager';

import {Card, Badge} from 'react-bootstrap'

const TodoList = (props) => {
    const context = useContext(SettingContext)
    console.log(context);
  
    return (
      <div>
         {props.list.map(item => (
        <Card className="card" style={{ width: '18rem' }} >
          <Card.Body>
              <Badge className="grabbing"   onClick={() => props.handleComplete(item._id)} variant={item.complete? 'secondary' : 'primary'}>{item.complete ? 'complete' : 'pending'}</Badge>
              <p >{item.text} </p>

          {/* <p >{item.text} </p> */}
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
