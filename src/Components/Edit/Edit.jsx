import React,{Component} from 'react';
import { Button, Modal } from 'react-bootstrap';
class Edit extends Component {
    


  render() {
      
   const {editRecipe} = this.props;
    return (
      <div>
       
        <Modal show={this.props.showStatus} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{editRecipe.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>{this.props.handleClose()}}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default Edit;