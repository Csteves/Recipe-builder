import React, {Component} from 'react';
import axios from 'axios';
import RecipeList from './RecipeList.jsx'
import DateStamp from '../utils/dateCreator'
import "./RecipeView.css"
import {Button} from 'react-bootstrap'


class RecipeView extends Component{
    constructor(){
        super();
        this.state = {
            input: '',
            recipes:[],
            url:"https://api.edamam.com/search",
            apiId: '0ddb90b0',
            apiKey: '2b1449cdc9400582c7f81b2d65ebee36'
        }
        this.findRecipe = this.findRecipe.bind(this);
        this.saveRecipe = this.saveRecipe.bind(this);
    }

handleInput(val){
this.setState({input:val})
};

findRecipe(){
    axios.get( `${this.state.url}?q=${this.state.input}&app_id=${this.state.apiId}&app_key=${this.state.apiKey}` ).then( response => {
        let firstTen = response.data.hits
        console.log(response.data)
        this.setState({ recipes: firstTen });
});
}
saveRecipe(title,ingredientLines,image){
const newRecipe = {
    title:title,
    ingredients:[...ingredientLines].join(","),
    image:image,
    date:DateStamp()
}
axios.post(`/api`,{newRecipe}).then(res =>{
    console.log(res.data)
    this.props.updatedRecipe(res.data);
})

}
    render(){
        return(
            <div className="container">
                 <h6>SEARCH ONLINE RECIPES</h6>   
                <div className="group" >
                    <input onChange={(e)=> this.handleInput(e.target.value)} placeholder="Recipe ingredient"/>
                    <Button bsStyle="success" className="search_button" onClick={this.findRecipe} >Find</Button>
                    <div className="bar" ></div>
                </div>
                <div className="list_container" >
                    <RecipeList 
                    recipeArr={this.state.recipes}
                    saveRecipe={this.saveRecipe}
                    />
                </div>
            </div>
            
        )
    }
}

export default RecipeView;