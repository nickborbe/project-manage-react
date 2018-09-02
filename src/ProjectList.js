import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AddTask from './AddProject';
import EditTask from './EditProject'



class ProjectList extends Component {
  constructor(props){
    super(props)
    this.state = {
      theTasks: null,
      showing: false,
      loggedInUser: this.props.theActualUser,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({...this.state, loggedInUser: nextProps["theActualUser"]})
    console.log('re rendering to do list component', this.state)
  }



  getAllTheProjects(){
    axios.get("http://localhost:5000/api/projects", {withCredentials: true})
    .then((allTheTasks)=>{
      this.setState({theTasks: allTheTasks.data, showing: false, loggedInUser: this.state.loggedInUser})
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  toggleEditForm(whichTask){
    if(this.state.showing === whichTask){
      this.setState({theTasks: this.state.theTasks, showing: false});
    } else{
      this.setState({theTasks: this.state.theTasks, showing: whichTask});
    }
  }

  renderForm(theIndex, theTaskID, theTitle, theDesc){
    if(this.state.showing === theIndex){
        return(
          <EditTask blah={()=>this.getAllTheProjects()} taskProp={theTaskID} title={theTitle} desc={theDesc}></EditTask>
      )
    }
  }

    deleteTask(theIdOfTheTask){
      axios.post(`http://localhost:5000/api/tasks/delete/${theIdOfTheTask}`, {}, {withCredentials: true})
      .then((response)=>{
        console.log(response);
        this.getAllTheProjects();
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    seeIfTaskBelongsToUser(task, index){
      if(this.state.loggedInUser && task.owner == this.state.loggedInUser._id){
        return (
          <div>
          <button onClick={()=>{this.deleteTask(task._id)}} style={{float:'right', backgroundColor: 'red', padding: '10px', margin: '0 5px'}}>
          Delete Task
          </button>
        <button onClick={()=>this.toggleEditForm(index)} style={{float:'right', backgroundColor: 'greenyellow', padding: '10px',  margin: '0 5px'}}> 
        Edit This Task 
        </button>
        </div>
        )
      } 
    }



  showTasks(){
    if(this.state.theTasks === null){
      this.getAllTheProjects();
    }

    if(this.state.theTasks){

      return (
        this.state.theTasks.map((task, index) => {
          return(
        <div key={index}>
          {this.seeIfTaskBelongsToUser(task, index)}
        <h3>{task.title}</h3>
        <p style={{maxWidth: '400px'}} >{task.description} </p>
        {this.renderForm(index, task._id, task.title, task.description)}

      
        </div>
          ) 
        })
      )
    } // closes the if statement
  }


  render() {
    return (
   <div>
        <h1> The Single Greatest Project Management App in the History of Human History </h1>
      <div className="App">
        
          <div className="list">
          <h2> My Projects </h2>
            {this.showTasks()}
          </div>

          
        <div className="add">
        <AddTask blah={()=>this.getAllTheProjects()}></AddTask>
        </div>



      </div>
  </div>
    );
  }
}







export default ProjectList;
