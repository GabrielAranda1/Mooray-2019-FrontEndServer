import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import setAuthToken from './utils/setAuthToken'

import Login from './components/auth/Login'
import AdminNavbar from './components/layout/AdminNavbar'
import UserNavbar from './components/layout/UserNavBar'
import Footer from './components/layout/Footer'
import AdminCatalog from './components/admin/Catalog'
import NewMovie from './components/admin/NewMovie';
import MovieList from './components/admin/MovieList'
import Movie from './components/admin/Movie'
import UpdateMovie from './components/admin/UpdateMovie'
import Discover from './components/public/Discover';
import MoviePage from './components/public/MoviePage'
import loginAuth from './components/auth/loginAuth';
import Performer from './components/admin/Performer'
import NewDirector from './components/admin/newDirector'
import Director from './components/admin/Director'
import PublicCatalog from './components/public/Catalog'
import NewList from './components/user/newList'
import EditList from './components/user/editList'

import './App.css';

// Check for token
if (localStorage.jwtToken) {

  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)

}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">

          {/*Admin Routes*/}
          <Route path="/admin" component={AdminNavbar} />
          <Route exact path="/admin/catalog" component={AdminCatalog} />
          <Route exact path="/admin/catalog/new-movie" component={NewMovie} />
          <Route exact path="/admin/catalog/list" component={MovieList} />
          <Route exact path="/admin/catalog/movie=:movie_id" component={Movie} />
          <Route exact path="/admin/catalog/update/:movie_id" component={UpdateMovie} />

          {/*Public Routes */}
          <Route path="/public" component={UserNavbar} />
          <Route path="/user" component={UserNavbar} />
          <Route exact path="/public/discover" component={Discover} />
          <Route exact path="/public/movie/:movie_id" component={MoviePage} />
          <Route exact path="/public/catalog" component={PublicCatalog} />

          {/* User Routes*/}
          <Route exact path="/auth/login/:user_id&:origin" component={loginAuth} />
          <Route exact path="/user/lists/new" component={NewList} />
          <Route exact path="/user/lists/list=:list_id" component={EditList} />

          <div className="container">
            <Route exact path="/login" component={Login} />
          </div>

          {/* Performer Routes */}
          <Route exact path="/admin/performer" component={Performer} />

          {/* Director Routes */}
          <Route exact path="/admin/director/new" component={NewDirector} />
          <Route exact path="/admin/director/:director_id" component={Director} />
        </div>
      </Router >
    );
  }
}

export default App;
