import React,{Component} from 'react';
import {Modal,Button} from 'react-bootstrap';
import DateStamp from '../utils/dateCreator'
class Edit extends Component {
    constructor(props){
      super(props);
      this.state = {
            title:'',
            ingredients:'',
            image:'',
            flag:false,
      }
      this.saveUpdate = this.saveUpdate.bind(this);
      this.handleState = this.handleState.bind(this);
    }
   
    handleState(){
      this.setState({
        title:this.props.editRecipe.title,
        ingredients:this.props.editRecipe.ingredients,
        image:this.props.editRecipe.image,
        flag:!this.state.flag
      })
    }
    saveUpdate(){
      const{title,ingredients,image} = this.state;
      const{id} = this.props.editRecipe;
      const newDate = DateStamp();
      const newRecipe = {
        title:title,
        ingredients:ingredients,
        image:image,
        id:id,
        date:newDate
      }
      this.props.handleUpdateFn(newRecipe);
      this.setState({title:"",ingredients:"",image:""})
    }
   
    handleTitle(e){
      const savedEvent = e.target;
      this.setState({title:savedEvent.value})
    }
    handleIngredients(e){
      const savedEvent = e.target;
      this.setState({ingredients:savedEvent.value})
    }
    handleImage(e){
      const savedEvent = e.target;
      this.setState({image:savedEvent.value})
    }


  render() {
    const {editRecipe} = this.props;
    return (
      <div>
       
        <Modal show={this.props.showStatus} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editRecipe.title}</Modal.Title>
          </Modal.Header>
          <h6>{(this.state.flag)?"ready to update":"click to update"}</h6>
          <Modal.Body>
                
            <input 
            label="title"
            type="text" 
            disabled={(this.state.flag)?"":"disabled"}  
            onChange={e => this.handleTitle(e)} 
            value={this.state.title}
            placeholder={editRecipe.title} 
            />
           
           <input
             type="text" 
             disabled={(this.state.flag)?"":"disabled"}  
             onChange={e => this.handleIngredients(e)} 
             value={this.state.ingredients}
             placeholder={editRecipe.ingredients}  
              />
      
           <input 
             type="text" 
             disabled={(this.state.flag)?"":"disabled"} 
             onChange={e => this.handleImage(e)} 
             value={this.state.image} 
             placeholder={editRecipe.image} 
              />
    
        </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='info' 
            onClick={this.handleState}
            active={(this.state.flag)?false:true}
            >
            click to update
            </Button>
            <Button bsStyle='success' onClick={this.saveUpdate}>save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default Edit;