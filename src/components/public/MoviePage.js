import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'

class Movie extends Component {

    constructor() {
        super()
        this.state = {
            'movie': '',
            'director': [{}],
            'user': localStorage.jwtToken ? jwt_decode(localStorage.jwtToken) : '',
            'watched': false,
            'favorite': false,
            'rate': ''
        }

        this.onChange = this.onChange.bind(this)
        this.checkIfWatched = this.checkIfWatched.bind(this)
        this.checkIfFavorite = this.checkIfFavorite.bind(this)
        this.markMovie = this.markMovie.bind(this)
        this.getUserRate = this.getUserRate.bind(this)
        this.rateMovie = this.rateMovie.bind(this)
        this.markAsFavorite = this.markAsFavorite.bind(this)
    }

    componentDidMount() {

        const movie_id = this.props.match.params.movie_id

        axios.get('/api/movies/unique/' + movie_id)
            .then(movie => {
                this.setState({ 'movie': movie.data.movie, 'director': movie.data.director })
            })

        this.checkIfWatched(movie_id)
        this.checkIfFavorite(movie_id)
        this.getUserRate(movie_id)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    // Returns all directors of this movie
    countDirectors() {

        return this.state.director.map(function (director, index) {
            if (index > 0)
                return (<p key={index}>{", " + director.director}</p>)
            else
                return (<p key={index}>{director.director}</p>)
        })
    }

    // Function that does a GET request to check if the logged in user has watched this movie
    checkIfWatched(movie_id) {
        if (this.state.user.id) {
            axios.get("/api/users/" + this.state.user.id + '/' + movie_id).then(flag => {
                if (flag.data) {
                    this.setState({ 'watched': flag.data })
                }
            })
        }
    }

    // Function that does the POST request to mark/unmark a movie as watched if user is logged in
    markMovie(e) {
        e.preventDefault()
        if (this.state.user.id) {
            axios.post("/api/users/" + this.state.user.id + '/' + this.state.movie.movie_id).then(res => {
                Swal.fire({
                    position: 'top',
                    type: 'success',
                    title: res.data,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => window.location.reload())


            })
        } else {
            Swal.fire({
                position: 'top',
                type: 'info',
                title: 'You need to log in to add movies to your watch list!',
                showConfirmButton: true,
                footer: '<a href="http://localhost:8080/Cliente_Mooray/components/login.jsp">Login</a>'
            })
        }
    }

    // Get current movie's current user rate
    getUserRate(movie_id) {
        if (this.state.user.id) {
            axios.get('/api/movies/rate/' + movie_id + '/' + this.state.user.id).then(res => {
                this.setState({ 'rate': res.data })
            })
        }
    }

    // Function that pops up a modal that saves the user's selected rate
    rateMovie(e) {
        e.preventDefault()

        if (this.state.user.id) {
            Swal.fire({
                text: 'Rate this movie',
                width: 600,
                html: '<div class="text-center"><h3>Rate this movie:</h3></div><div class="form-check form-check-inline"> <input selected class="form-check-input" type="radio" name="rate" id="rate0" value="0"></input> <label class="form-check-label" for="rate0">0</label> </div> <div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="rate" id="rate1" value="1"></input> <label class="form-check-label" for="rate1">1</label> </div> <div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="rate" id="rate2" value="2"></input> <label class="form-check-label" for="rate2">2</label> </div> <div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="rate" id="rate3" value="3"></input> <label class="form-check-label" for="rate3">3</label> </div> <div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="rate" id="rate4" value="4"></input> <label class="form-check-label" for="rate4">4</label> </div> <div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="rate" id="rate5" value="5"></input> <label class="form-check-label" for="rate5">5</label> </div> <div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="rate" id="rate6" value="6"></input> <label class="form-check-label" for="rate6">6</label> </div> <div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="rate" id="rate7" value="7"></input> <label class="form-check-label" for="rate7">7</label> </div> <div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="rate" id="rate8" value="8"></input> <label class="form-check-label" for="rate8">8</label> </div> <div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="rate" id="rate9" value="9"></input> <label class="form-check-label" for="rate9">9</label> </div> <div class="form-check form-check-inline"> <input class="form-check-input" type="radio" name="rate" id="rate10" value="10"></input> <label class="form-check-label" for="rate10">10</label> </div>'
            }).then(result => {
                if (result.value) {
                    let rate = document.querySelector('input[name=rate]:checked').value

                    axios.post('/api/movies/' + rate + '/' + this.state.movie.movie_id + '/' + this.state.user.id).then(res => {
                    }).then(() => window.location.reload())
                }
            })
        }
    }

    // Checks if user has this movie in his favorites list
    checkIfFavorite(movie_id) {
        if (this.state.user.id) {
            axios.get('/api/users/favorites/' + this.state.user.id + '/' + movie_id).then(res => {
                this.setState({ 'favorite': res.data })
            })
        }
    }

    // Function that marks/unmarks this movie as a favorite
    markAsFavorite(e) {
        e.preventDefault()

        if (this.state.user.id) {
            axios.post('/api/users/favorites/' + this.state.user.id + '/' + this.state.movie.movie_id).then(res => {
                Swal.fire({
                    position: 'top',
                    type: 'success',
                    title: res.data,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => window.location.reload())
            })
        }
    }

    render() {
        return (
            <div className="container shadow card-mooray">
                <div className="row">
                    <div className="col">
                        <h1 className="text-white">{this.state.movie.name} <a href='#' onClick={this.markMovie}> {this.state.watched ? <i className="fas fa-bookmark"></i> : <i className="far fa-bookmark"></i>}</a><p className="float-right">{this.state.movie.rate}/10</p></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <img className="img-thumbnail img-movie mt-3 mr-3 float-left" src={this.state.movie.cover} alt={this.state.movie.name}></img>
                        <div className="container m-3">
                            <p className="text-white m-3"><b>Description: </b>{this.state.movie.description}</p>
                            <p className="text-white m-3"><b>Duration: </b>{this.state.movie.duration} min</p>
                            <p className="text-white m-3"><b>Release Date: </b>{moment(this.state.movie.release_date).format("DD/MM/YYYY")}</p>
                            <ul className="text-white m-3 list-inline"><li className="list-inline-item"><b>Director: </b></li><li className="list-inline-item">{this.countDirectors()}</li></ul>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col mt-2">
                        {this.state.rate !== null && this.state.watched ? <button onClick={this.rateMovie} className="btn btn-success btn-rate" title="Your Rate">{this.state.rate}</button> : ''}
                        {this.state.rate === null && this.state.watched ? <button onClick={this.rateMovie} className="btn btn-primary btn-rate fas fa-star"></button> : ''}
                        {this.state.watched && this.state.favorite ? <button onClick={this.markAsFavorite} className="btn btn-danger btn-rate fas fa-heart ml-2" title="Favorite Movie"></button> : ''}
                        {this.state.watched && !this.state.favorite ? <button onClick={this.markAsFavorite} className="btn btn-light text-danger btn-rate fas fa-heart ml-2" title="Mark as Favorite"></button> : ''}
                    </div>
                </div>
            </div >
        )
    }
}

export default Movie