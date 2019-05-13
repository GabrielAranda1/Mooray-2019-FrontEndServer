import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

class Director extends Component {

    constructor() {
        super()
        this.state = {
            'movies': [{}],
            'director': {},
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.listMovies = this.listMovies.bind(this)
    }

    componentDidMount() {

        const director_id = this.props.match.params.director_id

        axios.get('/api/directors/' + director_id)
            .then(res => {
                this.setState({ 'director': res.data.director, 'movies': res.data.movies })
            })
    }

    onSubmit(e) {
        e.preventDefault()
        axios.post('/api/directors/' + this.state.director.director_id)
            .then(res => {
                window.location.reload()
            }).catch(err => alert(err))
    }

    listMovies(movie, index) {
        return (
            <Link key={index} to={"admin/catalog/movie=" + movie.movie_id}>
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
    }


    render() {
        return (
            <div className="container">
                <div className="card p-4 m-3 card-mooray">
                    <div className="row d-flex justify-content-center">
                        <h1 className="text-white">{this.state.director.name + ' ' + this.state.director.lastname}</h1>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <img className="img-thumbnail img-movie" src={this.state.director.picture} alt={this.state.director.name + ' ' + this.state.director.lastname}></img>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <p className="text-white m-3"><b>Birth Date: </b>{moment(this.state.director.birthdate).format("DD/MM/YYYY")}</p>
                        {this.state.director.deathdate != null ? <p className="text-white m-3"><b>Death Date: </b>{moment(this.state.director.deathdate).format("DD/MM/YYYY")}</p> : null}
                    </div>
                </div>
                <div className="card p-4 m-3 card-mooray">
                    <p className="text-white" align="justify">{this.state.director.bio}</p>
                </div>
                <div className="card p-4 m-3 card-mooray">
                    <div className="col">
                        {this.state.movies.map((movie, index) => this.listMovies(movie, index))}
                    </div>
                </div>
                <div className="row mb-2">
                    <Link className="btn btn-lg w-25 btn-primary" name="update" to={"/admin/catalog/update/" + this.state.director.director_id}>Update</Link>
                </div>
            </div>
        )
    }

}

export default Director