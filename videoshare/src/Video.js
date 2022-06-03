import React, { Component } from 'react';
import './index.css';
import './App.css';
import axios from 'axios';
import { withRouter } from "react-router";

class Video extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      vid: this.props.vid, 
      title: this.props.vidname , 
      body: this.props.description,
      id:this.props.id
    };   

  }

  deleteVideo = (e) =>{
    let id = this.state.id;
    axios.delete(`/video/${id}`).then(res => {
      if(res.data == 500){
        console.log("video does not exist")
      }else{
      console.log("video with id of " + res.data +" was deleted");
      }
      this.props.history.push("/video")
    })
  }

  render(){
      
    try{
      return(
      <div >
          <section>
            <video src = {this.state.vid} controls = "controls" class = "video"></video>
            <h1 class = "vidtitle">{this.state.title}</h1>
            <p class = "desc">{this.state.body}</p>
            <button onClick={this.deleteVideo}>Delete Video</button>  
          </section>
      </div>
      )
    }catch(err){
      return(<h1>Sorry, video could not be found.</h1>)
    }
  };

  componentDidMount = () => {
    this._isMounted = true;
    const id = this.props.match.params.id;
    axios.get(`/video/${id}`).then(res => {
        if(this._isMounted){
            this.setState ({
              vid: res.data.vid,
              title : res.data.videoData.vidname,
              body : res.data.videoData.description,
              id: id
            })
          console.log(this.state)
        }
    });

    
  };
  
  componentWillUnmount() {
    this._isMounted = false;
  }

}

export default withRouter (Video);
