import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'

class MoviesList extends Component {

    constructor() {
        super()
        this.state = {
            'movies': []
        }
    }

    componentDidMount() {
        this.getMovies()
        this.checkAdmin()
    }

    getMovies() {
        Axios.get('/api/movies/all-short')
            .then(movies => this.setState({ 'movies': movies.data }))
    }

    checkAdmin() {
        if (this.props.admin) {
            return (
                <div className="last-added">
                    {this.state.movies.map(function (movie, index) {
                        return (
                            <img key={index}
                                className="img-size img-thumbnail m-2"
                                id={movie.movie_id}
                                src={movie.cover}
                                title={movie.name + "\n" + moment(movie.createdAt).format("LLLL")}
                                alt={movie.name + "\n" + moment(movie.createdAt).format("LLLL")}
                            >
                            </img>
                        )
                    })}
                </div>
            )
        } else {
            return (
                <div className="last-added">
                    {this.state.movies.map(function (movie, index) {
                        return (
                            <Link key={index} to={'/public/movie/' + movie.movie_id}>
                                <img
                                    className="img-size img-thumbnail m-2"
                                    id={movie.movie_id}
                                    src={movie.cover}
                                    title={movie.name}
                                    alt={movie.name}
                                >
                                </img>
                            </Link>
                        )
                    })}
                </div>
            )
        }
    }

    render() {
        return (
            this.checkAdmin()
        )
    }
}

export default MoviesList