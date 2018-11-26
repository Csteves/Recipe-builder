import React,{Component} from 'react';
import {Modal,Button,FormGroup,FormControl} from 'react-bootstrap';


class EditGrocery extends Component {
  constructor(){
      super();
      this.state = {
          updatedItems:[]
      }
  }

  handleSubmit(newItem,index){
    const itemsCopy = [...this.props.items];
    //itemsCopy.splice(index,1,event.target.value);
    console.log(itemsCopy)
  }
  handleEdit(event,index){
      const newItem = event.target.value;
      return newItem
  }

  render() {
    const {items,isEditting} = this.props;
    const singleItem = items.map((item,index) =>{
        return(
            <FormControl
            key={index}
            type='text'
            value={item}
            onChange={(event)=> this.handleEdit(event,index)}
            />
        )
    })

    return (
      <div>
       
        <Modal show={isEditting} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{'Grocery List'}</Modal.Title>
          </Modal.Header>
          {/* <h6>{(flag)?"ready to update":"click to update"}</h6> */}
          <Modal.Body>
                <FormGroup>
                    {singleItem}
                </FormGroup>
        </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='info' 
            active={true}
            >
            click to update
            </Button>
            <Button bsStyle='success' onClick={this.handleSubmit}>save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}


export default EditGrocery;