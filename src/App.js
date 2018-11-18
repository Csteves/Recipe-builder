import React, { Component } from 'react';
 import './App.css';
import axios from 'axios'
import Header from './Components/Header/Header.jsx';
import CreateRecipe from './Components/Create/CreateRecipe.jsx'
import Display from './Components/Display/Display';

class App extends Component {
  constructor(){
    super();
    this.state = {
      recipes:[],
      flag: false
    }
    this.addRecipe = this.addRecipe.bind(this);
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount(){
    axios.get(`/api`).then(res =>{
      if(res.data.length > 0) this.setState({flag:true})
      this.setState({
        recipes:res.data
      })
    })
  }
  addRecipe(recipes){
    this.setState({
      recipes:recipes
    })
  }

  handleDelete(id){
    axios.delete(`/api/${id}`).then(res=>{
      this.setState({recipes:res.data})
    })
  }

  render() {
    return (
      <div className="App">
       <div>
         <Header/>
       </div>
        <div>
          <CreateRecipe retrieveRecipes={this.addRecipe}/>
        </div>
        
       <div className='display'>
         <Display 
         recipes={this.state.recipes}
         handleDelete={this.handleDelete}
         />
       </div>
      </div>
    );
  }
}

export default App;
