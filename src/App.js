import React, { Component } from 'react';
 import './App.css';
import axios from 'axios'
import Header from './Components/Header/Header.jsx';
import CreateRecipe from './Components/Create/CreateRecipe.jsx'
import Display from './Components/Display/Display';
import Edit from './Components/Edit/Edit.jsx';
import RecipeView from './Components/Display/RecipeView.jsx'



class App extends Component {
  constructor(){
    super();
    this.state = {
      recipes:[],
      show: false,
      recipeToEdit:{},
      dogUrl:this.getDogPic(),
      breedArray:[],
      breedButtonsDisabled:true
    }
    this.addCreatedRecipe = this.addCreatedRecipe.bind(this)
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.setEditRecipe = this.setEditRecipe.bind(this);
    this.handleUpdateFn = this.handleUpdateFn.bind(this);
    this.getDogPic = this.getDogPic.bind(this);
    this.showDogByBreed = this.showDogByBreed.bind(this);
    this.changeDog = this.changeDog.bind(this);
    
  }
  componentDidMount(){
    axios.get(`/api`).then(res =>{
      this.setState({
        recipes:res.data
      })
    })
    axios.get(`/api/grocery`).then(res =>{
      console.log(res.data)
    })
    this.dogPicTimer = setInterval(()=>this.getDogPic(),7000);
  }
  componentWillUnmount(){
    clearInterval(this.dogPicTimer);
  }
  //=============================================================
    //Functions for handling dog pictures and api
  //=============================================================
  getDogPic(breed,random='random'){
    if(breed){
      axios.get(`https://dog.ceo/api/breed/${breed}/images`).then(res =>{
      this.setState({
        dogUrl:res.data.message[0],
        breedArray:res.data.message,
        
      })
      this.showDogByBreed(res.data.message,0);
      })
    }else{
      axios.get(`https://dog.ceo/api/breeds/image/${random}`).then(res =>{
      this.setState({
        dogUrl:res.data.message
        })
      })
    }
    
  }
 
  showDogByBreed(breedArr,index){
    clearInterval(this.dogPicTimer)
   this.setState({dogUrl:breedArr[index], breedButtonsDisabled:false})
    
  }
  changeDog(index){
    
    this.showDogByBreed(this.state.breedArray,index)
    //console.log(index,"index")
  }
//=============================================================
    //Functions for handling CRUD for Recipes
//=============================================================
  
  addCreatedRecipe(recipes){
    this.setState({
      recipes:recipes
    })
  }
 
  handleShow(){
  this.setState({show:!this.state.show})
 
  }
  handleUpdateFn(obj){
  console.log(obj);
  const {id} = obj
  axios.put(`/api/${id}`,{obj}).then(res =>{
    this.setState({recipes:res.data, recipeToEdit:''});
  })
  this.handleShow();
  }
  handleDelete(id){
    axios.delete(`/api/${id}`).then(res=>{
      this.setState({recipes:res.data})
    })
  }

  setEditRecipe(id){
  console.log('extracted', id)
  let editCopy = [...this.state.recipes]
  let editIndex = editCopy.findIndex(recipe => recipe.id === id);
  let editRecipe = editCopy.splice(editIndex,1);
  console.log('edit recipe',editRecipe)
  this.setState({recipeToEdit:editRecipe[0]})
  this.handleShow(); 
  this.forceUpdate();
  }


  render() {
   
    return (
      <div className="App">
        <div className="create_and_display_container" >
          <div className="main_create_div" >
            <CreateRecipe 
            retrieveRecipes={this.addCreatedRecipe}
            dogPic={this.state.dogUrl}
            getDogPic={this.getDogPic}
            breedLength={this.state.breedArray.length}
            getIndex={this.changeDog}
            breedButtonsStatus={this.state.breedButtonsDisabled}
            />
          </div>
          
          <div>
          <Edit 
          showStatus={this.state.show}
          handleClose={this.handleShow}
          editRecipe={this.state.recipeToEdit}
          handleUpdateFn={this.handleUpdateFn}
          />
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
        <div className="recipe_view">
          <RecipeView
          updatedRecipe={this.addCreatedRecipe}
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
