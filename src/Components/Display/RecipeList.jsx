import React,{Component} from 'react'
import Swiper from 'react-id-swiper';
import './RecipeList.css'
import {Button} from 'react-bootstrap'
import ListItem from './RecipeListItem.jsx'
export default class RecipeList extends Component{
    render(){
        const params = {
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }
        }  
    let singleRecipeArr = this.props.recipeArr.map((recipe,i) =>{
        return(
        <div key={i} className="single_recipe">
           <div className="Ingredients">
           <h5>{recipe.recipe.label}</h5>
                <ul>
                    {recipe.recipe.ingredientLines.map((ingredient,i) =>{
                    return(
                        <li key={i} >{ingredient}</li>
                        )
                    })}
                </ul>
            </div>
            <div className="img_container">
            <img src={recipe.recipe.image} className="single_recipe_image" alt="recipe" />
            <a href={recipe.recipe.url}><Button bsStyle="success" className="source_button">View Source</Button></a>
            </div>
        </div>
        )
    })
    return(
        <Swiper {...params} className="swiper" shouldSwiperUpdate >
           {singleRecipeArr.map((recipe,key) =>{
              return(<div key={key}><ListItem recipe={recipe}/></div>)
           })}
        </Swiper>
    )
    }
}