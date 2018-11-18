import React,{Component} from 'react';
import axios from 'axios';
import DateStamp from '../utils/dateCreator'
import './CreateRecipe.css';
import {Button} from 'react-bootstrap';

class CreateRecipe extends Component{
    constructor(){
        super();
        this.state = {
            title: '',
            ingredients:'',
            image: '',
            recipe:{}
        }
    }
    CreateRecipe(){
        const newRecipe = {
            title:this.state.title,
            ingredients:this.state.ingredients,
            image:this.state.image,
            date:DateStamp()
        }
        axios.post("/api",{newRecipe}).then(res =>{
           this.setState({
               title:'',
               ingredients:'',
               image:''
           })
           this.props.retrieveRecipes(res.data);
           console.log(res.data)
        })
    }

    handleInput(event){
       if(event.name === "title")this.setState({title:event.value});
       else if(event.name === "ingredients")this.setState({ingredients:event.value});
       else if(event.name === "image")this.setState({image:event.value});
    }

    render(){
        
        return(
            <div className="CreateRecipe_container">
                <section>
                    <h6>ADD A TITLE</h6>
                    <input
                    placeholder='Recipe title' 
                    value={this.state.title}
                    name="title" onChange={event => this.handleInput(event.target)}
                    />
                    <h6>ADD INGREDIENTS</h6>
                    <input
                    placeholder="Ingredients: seperate with comma"
                     value={this.state.ingredients} 
                    name="ingredients"
                     onChange={event => this.handleInput(event.target)}
                    />
                    <h6>ADD AN IMAGE</h6>
                    <input 
                    placeholder="Image URL"
                    value={this.state.image}
                    name="image" 
                    onChange={event => this.handleInput(event.target)}
                    />
                    <Button 
                    onClick={()=>this.CreateRecipe()}
                    className="flex_self_button"
                    bsStyle="success"
                    >
                    Create Recipe
                    </Button>
                </section>
            
            </div>
        )
    }
}
export default CreateRecipe;