import React, {Component} from 'react';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
import './GrocList.css'



class DisplayGrocList extends Component{
   
    render(){
       const groceryTitle = "GROCERY LIST"
       let singleItem = this.props.ingredients.map((item,index)=>{
        return(
            <ListGroupItem 
            className="list_ingredients" 
            key={index}
            onClick={()=>this.props.deleteItem(index)}
            >
            {item}
            </ListGroupItem>
        )
       })
        return(
            <div className="grocery_list_container" >
                <PanelGroup accordion id="grocery_display">
                <Panel 
                eventKey={1}
                key={1}
                bsStyle="success"
                >
                 <Panel.Heading>
                    <Panel.Title 
                    className="title"
                    toggle
                    >
                    {groceryTitle}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body 
                collapsible>
                    <h6>Items</h6>
                    <em>* click item to delete</em>
                    <ListGroup>
                    {singleItem}
                    </ListGroup>
                <ButtonToolbar>
                  <Button 
                  onClick={this.props.handleShow}
                  >
                  Edit
                  </Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>  
                </PanelGroup>
            </div>
        )
    }
}
export default DisplayGrocList;