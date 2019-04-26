import React, { Component } from 'react'
import MoviesList from '../data/movieList'

class Catalog extends Component {

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
                        </select>
                    </div>
                </div>
                <div className="row">
                    <MoviesList admin={false} />
                </div>
            </div>
        )
    }
}

export default Catalog