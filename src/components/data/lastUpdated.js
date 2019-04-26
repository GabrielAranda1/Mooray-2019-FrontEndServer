import React, { Component } from 'react'
import Axios from 'axios'
import moment from 'moment'

class LastUpdated extends Component {

    constructor() {
        super()
        this.state = {
            'movies': []
        }
    }

    componentDidMount() {
        this.getMovies()
    }

    getMovies() {
        Axios.get('/api/movies/last-updated')
            .then(movies => this.setState({ 'movies': movies.data }))
    }

    render() {
        return (
            <div className="last-updated">
                {this.state.movies.map(function (movie, index) {
                    return (
                        <img key={index}
                            className="img-size img-thumbnail m-2"
                            id={movie.movie_id}
                            src={movie.cover}
                            title={movie.name + "\n" + moment(movie.updatedAt).format("LLLL")}
                            alt={movie.name + "\n" + moment(movie.updatedAt).format("LLLL")}
                        >
                        </img>
                    )
                })}
            </div>
        )
    }
}

export default LastUpdated