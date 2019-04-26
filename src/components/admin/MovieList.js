import React, { Component } from 'react'
import MoviesList from '../data/movieList'

class MovieList extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-2">
                        <select className="form-control form-control-lg m-2" name="filter" id="filter">
                            <option disabled selected>Filter</option>
                            <option value="asc">Ascending Date</option>
                            <option value="desc">Descending Date</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                            <option value="active">Active</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <MoviesList />
                </div>
            </div>
        )
    }
}

export default MovieList