import React,{Component} from 'react';
import axios from 'axios';
import DateStamp from '../utils/dateCreator'
import './CreateRecipe.css';
import {Button} from 'react-bootstrap';

class CreateRecipe extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            ingredients:'',
            image: '',
            recipe:{},
            //State variables for dog breeds and buttons
            breed:'',
            dogBreedindex:1,
            leftDisable: props.breedButtonsStatus,
            rightDisable:props.breedButtonsStatus
        }
    }
    CreateRecipe(){
        const newRecipe = {
            title:this.state.title,
            ingredients:this.state.ingredients,
            image:this.state.image,
            date:DateStamp()
        }
        axios.post("/api",{newRecipe}).then(res =>{
           this.setState({
               title:'',
               ingredients:'',
               image:'',
               
           })
           this.props.retrieveRecipes(res.data);
           console.log(res.data)
        })
    }

    handleInput(event){
       if(event.name === "title")this.setState({title:event.value});
       else if(event.name === "ingredients")this.setState({ingredients:event.value});
       else if(event.name === "image")this.setState({image:event.value});
    }
    //=============================================================
    //Functions for handling dog input and buttons
    //=============================================================
    breedHandler(event){
        this.setState({
            breed:event.target.value
        });
       
    }
    sendBreed(event){
        if(event.key == "Enter" ){
            this.props.getDogPic(this.state.breed)
            this.setState({rightDisable:!this.state.rightDisable})
        }
    }
    handleIndexButtons(left,right){
        let currentIndex = this.state.dogBreedindex;
        //handle disables of buttons
        if(currentIndex <= 1){
            this.setState({leftDisable:true})
            console.log(this.state.leftDisable,'from inside if current is true')
        }else if(currentIndex >= 1 && currentIndex <= this.props.breedLength){
            this.setState({leftDisable:false,rightDisable:false})
        }
        // handle index for each button click
        if(left){
            console.log('fired left')
            currentIndex--;
            console.log(currentIndex)
            this.setState({dogBreedindex:currentIndex})
            this.props.getIndex(currentIndex)
        }else if(right){
            console.log("fired rigth")
            currentIndex++;
            console.log(currentIndex)
            this.setState({dogBreedindex:currentIndex})
            this.props.getIndex(currentIndex)
        }
    }

    render(){
        
        return(
            <div className="CreateRecipe_container">
                <section>
                    <div className="dog_image_container" >
                    <h6>DOG PICS FOR ENJOYMENT</h6>
                        <div className="dog_image" >
                        <img src={this.props.dogPic} alt=""/>
                        <div className="dog_pic_toolbar">
                            <Button
                            bsStyle="success"
                            bsSize="xsmall"
                            disabled={this.state.leftDisable}
                            onClick={()=>this.handleIndexButtons(true,null)}
                            >
                            &#8592;
                            </Button>
                            <input 
                            type="text"
                            placeholder="show by breed"
                            onChange={(event)=> {this.breedHandler(event)}}
                            onKeyPress={event => this.sendBreed(event)}
                            />
                            <Button
                            bsStyle="success"
                            bsSize="xsmall"
                            disabled={this.state.rightDisable}
                            onClick={()=>this.handleIndexButtons(null,true)}
                            >
                            &#8594;
                            </Button>
                        </div>
                        
                        </div>

                    </div>
                    <div className="create_recipe_container" >
                    <h6>ADD A TITLE</h6>
                    <input
                    placeholder='Recipe title' 
                    value={this.state.title}
                    name="title" onChange={event => this.handleInput(event.target)}
                    />
                    <h6>ADD INGREDIENTS</h6>
                    <input
                    placeholder="Ingredients: seperate with comma"
                     value={this.state.ingredients} 
                    name="ingredients"
                     onChange={event => this.handleInput(event.target)}
                    />
                    <h6>ADD AN IMAGE</h6>
                    <input 
                    placeholder="Image URL"
                    value={this.state.image}
                    name="image" 
                    onChange={event => this.handleInput(event.target)}
                    />
                    <Button 
                    onClick={()=>this.CreateRecipe()}
                    className="flex_self_button"
                    bsStyle="success"
                    >
                    Create Recipe
                    </Button>
                    </div>
                </section>
            
            </div>
        )
    }
}
export default CreateRecipe;