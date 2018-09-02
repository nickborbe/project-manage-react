import React, { Component } from 'react';
import axios from 'axios';



class EditProject extends Component {
    constructor(props){
        super(props)
        this.state = {
            titleInput: this.props.title,
            descInput: this.props.desc,
        }
    }

    submitChanges(){
        axios.post(`http://localhost:5000/api/projects/edit/${this.props.projectProp}`,
         {title: this.state.titleInput, description: this.state.descInput},
         {withCredentials: true})
        .then((res)=>{
            console.log(res)
            this.setState({titleInput:'', descInput: ''})
            this.props.blah()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    updateTitle(e){
        this.setState({
            titleInput: e.target.value,
            descInput: this.state.descInput
        })

    }

    updateDescription(e){
        this.setState({
            titleInput: this.state.titleInput,
            descInput: e.target.value,
        })
    }


    render(){
        return(
        <div className="edit-project">
        <h3> Edit This Project </h3>
        <label> Title </label>
        <input value={this.state.titleInput} onChange={(e)=>{this.updateTitle(e)}}  type="text"/> 
  
        <label> Description </label>
        <input value={this.state.descInput}  onChange={(e)=>{this.updateDescription(e)}}  type="text"/> 
  
        <button onClick={()=>this.submitChanges()}> Save Changes </button>
  
        </div>
        )
    }





}

export default EditProject;
