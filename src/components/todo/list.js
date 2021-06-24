import React from 'react';
import '../../css/list.scss'
import { useContext } from 'react';
import { SettingContext } from '../../context/setting-manager';

import {Card, Badge, ButtonGroup, Button, Container, Row, Col, Dropdown, DropdownType,DropdownButton} from 'react-bootstrap'

const TodoList = (props) => {
    const context = useContext(SettingContext)

    return (
        <div>
      <Container>
        <Row>
          <Col  sm={7}>
        <section className="card-section">
         {props.list.slice(context.displayItems-3, context.displayItems).map((item, inx) => (
        <Card key={inx} className={!context.displayCompletedItem && item.complete? 'hide' : 'card' } style={{ width: '18rem' }} >
          <Card.Body>
              <Container>
                <Row>
                  <Col sm={8}>
                    <Badge className="grabbing"   onClick={() => props.handleComplete(item._id)} variant={item.complete? 'secondary' : 'primary'}>{item.complete ? 'complete' : 'pending'}</Badge>
                  </Col>
                  <Col sm={4}>
                    <p >{item.assignee} </p> 
                  </Col>
                </Row>
                <Row>
                  <Col sm={8}>
                    <p >{item.text} </p>    
                  </Col>
                  <Col sm={4}>
                    <p>{item.date}  </p>   
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <p >Difficulty : {item.difficulty} </p>    
                  </Col>
                  <Col sm={6}>
                    <button onClick={() => props.handleRemove(item._id)} >X</button>
                    <button onClick={() => props.show(item)} >Update</button>
                  </Col>
                </Row>
              </Container>
            
          </Card.Body>
        </Card>
         ))}

        </section>
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button variant="secondary" onClick={() =>  context.setDisplayItems(3) }>1</Button> 
          <Button variant="secondary" onClick={() => context.setDisplayItems(6)}>2</Button>{' '}
          <Button variant="secondary" onClick={() => context.setDisplayItems(9)}>3</Button>{' '}
            {/* {props.list.slice(Math.ceil(props.list.length/2), props.list.length).map((el, inx) => (

            ))} */}
       </ButtonGroup>
          </Col>

          <Col  sm={5}>
          <DropdownButton
            menuAlign="left"
            title="sort by"
            id="dropdown-menu-align-right"
             >
            <Dropdown.Item onClick={() => context.setSortItems('sort')} eventKey="1">Difficulty</Dropdown.Item>
            <Dropdown.Divider />
          </DropdownButton>
          <Button onClick={() => context.setSortItems('')} variant="light">reset</Button>
          </Col>
        </Row>
      </Container>

      </div>
    );
}

export default TodoList;
