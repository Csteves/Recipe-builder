import React, {Component} from 'react';
import axios from 'axios';
import './Display.css';
import {PanelGroup,Panel,Button,ButtonToolbar,ListGroup,ListGroupItem,Image} from 'react-bootstrap';


class Display extends Component{
  constructor(){
      super();
      this.state = {
          image:''
      }
  }

 
   
    render(){

        console.log('display check:',this.state.recipes);
        let singleRecipe = this.props.recipes.map((recipe) =>{
            return(
                <Panel 
                eventKey={recipe.id}
                key={recipe.id}
                bsStyle="success"
                >
                 <Panel.Heading>
                    <Panel.Title 
                        className="title"
                        toggle>{recipe.title}-{recipe.date}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Body 
                collapsible>
                    <h6>Ingredients</h6>
                    <ListGroup>
                        {recipe.ingredients.split(",").map((ingredient, index) => (
                        <ListGroupItem className="list_ingredients" key={index}>{ingredient}
                        </ListGroupItem>
                        ))}
                        <ListGroupItem> 
                            <Image id="recipe_image" src={recipe.image} rounded/> 
                        </ListGroupItem>
                    </ListGroup>
                <ButtonToolbar>
                  <Button 
                  onClick={()=>{this.props.handleEdit(recipe.id)}} bsStyle="warning"
                  >
                  Edit
                  </Button>
                  <Button
                  onClick={()=>{this.props.handleDelete(recipe.id)}} 
                  bsStyle="danger"
                  >
                  Delete
                  </Button>
                </ButtonToolbar>
              </Panel.Body>
            </Panel>
            )
        })
           
       
        return(
            <div className="main_display_container" >
                <PanelGroup accordion id="recipes_display">
                    {singleRecipe}           
                </PanelGroup>
            </div>
            
               
            
        )
    }
}
export default Display;