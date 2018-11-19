import React, { Component } from 'react';
import './Header.css';
import RecipeIcon from './../../recipe.png';
import Date from '../utils/dateCreator.js';



class Header extends Component{

    render(){

        return(
        <div>
            <header>
                <div className="logo_container">
                    <img src={RecipeIcon} alt=""/>
                </div>
                <h1>Recipe Builder</h1>
                <h6><Date></Date></h6>
            </header>
            <nav>
                <ul>
                    <li>MY RECIPES</li>
                    <li>CREATE A RECIPE</li>
                    <li>UPDATE A RECIPE</li>
                </ul>
            </nav>
        </div>
            
        )
    }
}

export default Header;
