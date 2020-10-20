import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';



import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import PhotoList from './components/PhotoList';
import Error404 from './components/Error404';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <div>
          <SearchForm />
          <Nav />
          <Switch>
            <Route path="/search/:searchTerm" component={PhotoList} />
            <Redirect to="/search/cats" path="/cats" />
            <Redirect to="/search/dogs" path="/dogs" />
            <Redirect to="/search/computers" path="/computers" />
            <Redirect to="/cats" exact path="/" />
            <Route component={Error404} />
          </Switch>

        </div>
        
      </BrowserRouter>
    );
  }
}

export default App;
