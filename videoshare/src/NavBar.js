import React, { Component } from 'react';
import './index.css';
import './App.css';
import { Link } from 'react-router-dom';


class NavBar extends Component { 

    constructor(props){
        super(props);
    }

  render(){
    return (
    <nav>
      <ul className="nav">
        <Link to="/home">
            <li className="nav">
                Home
            </li>
        </Link>
        <Link to="/video">
            <li  className="nav">
               Video
            </li>
        </Link>
        <Link to="/upload">
            <li  className="nav">
              Upload
            </li>
        </Link>
        <Link to="/account">
            <li  className="nav">
              Account
            </li>
        </Link>
      </ul>
    </nav>
    );
  };


  
}

export default NavBar
