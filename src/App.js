import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      baseUrl: "http://localhost:4000"
    }
  }
  componentDidMount(){
    axios.get(`/api`).then(res =>{
      console.log(res);
    })
  }
  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
