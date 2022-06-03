import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import Video from './Video';
import VideoList from './VideoList';
import Upload from './Upload';

const Main = () =>{
  return(
    <Switch>
        <Route exact path="/video">
          <VideoList/>
        </Route>
        <Route exact path="/video/:id" >
          <Video/>
        </Route>
        <Route exact path="/upload">
          <Upload/>
        </Route>
        <Route exact path="/">
          <Redirect to="/home"></Redirect>
        </Route> 

      </Switch>
  )
}


export default Main;
    