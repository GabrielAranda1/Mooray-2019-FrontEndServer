import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'

class Movie extends Component {

    constructor() {
        super()
        this.state = {
            'movie': '',
            'director': [{}]
        }

        this.onSubmit = this.onSubmit.bind(this)
    }
    componentDidMount() {

        const movie_id = this.props.match.params.movie_id

        axios.get('/api/movies/unique/' + movie_id)
            .then(movie => {
                this.setState({ 'movie': movie.data.movie, 'director': movie.data.director })
            })
    }

    onSubmit(e) {
        e.preventDefault()
        axios.post('/api/movies/status/' + this.state.movie.movie_id)
            .then(res => {
                window.location.reload()
            }).catch(err => alert(err))
    }

    checkActive() {
        if (this.state.movie.is_active)
            return (<button name="click" onClick={this.onSubmit} className="btn btn-lg w-25 btn-danger">Inactivate</button>)
        else
            return (<button name="click" onClick={this.onSubmit} className="btn btn-lg w-25 btn-primary">Activate</button>)
    }

    countDirectors() {

        return this.state.director.map(function (director, index) {
            if (index > 0)
                return (<p key={index}>{", " + director.director}</p>)
            else
                return (<p key={index}>{director.director}</p>)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="col">
                    <h1 className="text-white">{this.state.movie.name}</h1>
                    <img className="img-thumbnail img-movie mt-3 mr-3 float-left" src={this.state.movie.cover} alt={this.state.movie.name}></img>
                    <div className="container m-3">
                        <p className="text-white m-3"><b>Description: </b>{this.state.movie.description}</p>
                        <p className="text-white m-3"><b>Duration: </b>{this.state.movie.duration} min</p>
                        <p className="text-white m-3"><b>Release Date: </b>{moment(this.state.movie.release_date).format("DD-MM-YYYY")}</p>
                        <p className="text-white m-3"><b>Rate: </b>{this.state.movie.rate}</p>
                        <ul className="text-white m-3 list-inline"><li className="list-inline-item"><b>Director: </b></li><li className="list-inline-item">{this.countDirectors()}</li></ul>
                    </div>
                    <div className="row mb-2">
                        <Link className="btn btn-lg w-25 btn-primary" name="update" to={"/admin/catalog/update/" + this.state.movie.movie_id}>Update</Link>
                    </div>
                    <div className="row">
                        {this.checkActive()}
                    </div>
                </div>
            </div >
        )
    }
}

export default Movie