import React, { Component } from 'react';
 import './App.css';
import axios from 'axios'
import Header from './Components/Header/Header.jsx';
import CreateRecipe from './Components/Create/CreateRecipe.jsx'
import Display from './Components/Display/Display';
import Edit from './Components/Edit/Edit.jsx'

class App extends Component {
  constructor(){
    super();
    this.state = {
      recipes:[],
      show: false,
      recipeToEdit:{},
    }
    this.addCreatedRecipe = this.addCreatedRecipe.bind(this)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.setEditRecipe = this.setEditRecipe.bind(this)
    
  }
  componentDidMount(){
    axios.get(`/api`).then(res =>{
      this.setState({
        recipes:res.data
      })
    })
  }
  addCreatedRecipe(recipes){
    this.setState({
      recipes:recipes
    })
  }
  
handleShow(){
  this.setState({show:!this.state.show})
 
  

}
handleDelete(id){
  console.log('b4 deleteId',id)
    axios.delete(`/api/${id}`).then(res=>{
      console.log('deleteId',id)
      console.log('b4 delete',this.state.recipes)
      this.setState({recipes:res.data})
      console.log("after delete", this.state.recipes)
    })
  }

  setEditRecipe(id){
  console.log('extracted', id)
  let editCopy = [...this.state.recipes]
  let editIndex = editCopy.findIndex(recipe => recipe.id === id);
  let editRecipe = editCopy.splice(editIndex,1);
  console.log('edit recipe',editRecipe)
  this.setState({recipeToEdit:editRecipe[0]})
  // axios.get('/api').then(res =>{
  //   let editCopy = [...res.data];
  //   let editIndex = editCopy.findIndex(recipe => recipe.id === id);
  //   console.log("edit index",editIndex);
  //   let editRecipe = editCopy.splice(editIndex,1);
  //   console.log('edit recipe',editRecipe)
  //   this.setState({recipes:res.data,recipeToEdit:editRecipe[0]})
  // })
  this.handleShow(); 
  }


  render() {
   
    return (
      <div className="App">
        <div className="create_and_display_container" >
          <div className="main_create_div" >
            <CreateRecipe retrieveRecipes={this.addCreatedRecipe}/>
          </div>
        
        <div className='display'>
           <h5>My Recipes</h5>
           <Display 
           recipes={this.state.recipes}
           handleDelete={this.handleDelete}
           handleShow={this.handleShow}
           setEditRecipe={this.setEditRecipe}
         />
       </div>
       <div>
          <Edit 
          showStatus={this.state.show}
          handleClose={this.handleShow}
          editRecipe={this.state.recipeToEdit}
         
          />
        </div>
      </div>
        
       <div className="main_header_div" >
         <Header className="header_component"/>
       </div>
       
      </div>
    );
  }
}

export default App;
