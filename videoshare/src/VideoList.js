import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import './App.css';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';

class VideoList extends Component { 
    _isMounted = false;

    constructor(props){
        super(props);
        this.state ={
            videos: []
        }
    }

  render(){
    return (
        <div>
            <section >
            <ul className="vidlist">
            {this.state.videos.map(({id, title}) => (
                <Link to={`/video/${id}`}>
            <li className="vidlist" key={id}>{title}</li>
            </Link>
          ))}
        </ul>
            </section>
        </div>
    );
  };

  componentDidMount = () => {
    this._isMounted = true;
    axios.get(`/video`).then(res => {
        console.log(res.data);
        const videos = res.data.map(obj => ({id: obj._id.toString(), title: obj.vidname}));
        if(this._isMounted){
            this.setState({ videos:videos });
        }
    });
  };
  
  componentWillUnmount() {
    this._isMounted = false;
  };

}

export default withRouter (VideoList);
