import React, {useContext } from 'react'
import './App.css';
import { AuthProvider,AuthContext } from './Contexts/AuthContext';
import {BrowserRouter as Router,Route,Redirect,Switch} from "react-router-dom"
import Login from './Components/Login';
import Signin from './Components/Signin';
import Feed from './Components/Feed';
import Profile from './Components/Profile';

function App() {
  return (
      // <Login></Login>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/signin" component={Signin}></Route>
            <Route path="/profile" component={Profile}></Route>
            <ProtectedRoute path="/" exact abc={Feed}></ProtectedRoute>
          </Switch>
        </AuthProvider>
      </Router>
  );
}

function ProtectedRoute(parentProps){
  let {currentUser} = useContext(AuthContext);

  const Component=parentProps.abc;

  return(
    <Route {...parentProps} render={
      (parentProps)=>{
        return(currentUser!=null?<Component {...parentProps}></Component>:<Redirect to="/login"></Redirect>)
      }
    }></Route>
  )
}

export default App;
