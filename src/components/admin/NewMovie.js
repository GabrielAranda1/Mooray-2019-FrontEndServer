import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import DirectorList from '../data/directorList'
import axios from 'axios';



class NewMovie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            duration: '',
            cover: '',
            release_date: '',
            errors: {},
            performer_id: [],
            director_id: [],
            character_name: []
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.newDir = this.newDir.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    newDir() {
        return <DirectorList onChange={this.onChange} />
    }

    onSubmit(e) {
        e.preventDefault()

        const newMovie = {
            name: this.state.name,
            description: this.state.description,
            duration: this.state.duration,
            cover: this.state.cover,
            release_date: this.state.release_date,
            performer_id: this.state.performer_id,
            director_id: this.state.director_id,
            character_name: this.state.character_name,
        }

        axios.post('/api/movies/new', newMovie)
            .then(res => {
                if (res.status !== 400) {
                    window.location = "/admin/catalog/movie=" + res.data.movie_id
                }
            })
            .catch(err => this.setState({ errors: err.response.data }))
    }
    render() {
        return (
            <div className="newMovie">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 m-auto">
                            <h1 className="display-4 text-center text-white">New Movie</h1>
                            <div className="card-mooray p-4 m-3">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Name"
                                            id="name"
                                            name="name"
                                            required
                                            value={this.state.name}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg"
                                            placeholder="Description"
                                            name="description"
                                            rows="6"
                                            maxLength="2499"
                                            value={this.state.description}
                                            onChange={this.onChange}
                                        >
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="number"
                                            className="form-control form-control-lg"
                                            placeholder="Duration (minutes)"
                                            name="duration"
                                            id="duration"
                                            required
                                            value={this.state.duration}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control form-control-lg"
                                            placeholder="cover"
                                            name="cover"
                                            id="cover"
                                            required
                                            value={this.state.cover}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input type="date"
                                            className="form-control form-control-lg"
                                            placeholder="Release Date"
                                            name="release_date"
                                            id="release_date"
                                            required
                                            value={this.state.release_date}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <DirectorList onChange={this.onChange} />
                                    </div>
                                    <Link className="btn btn-success fa fa-plus" onClick={this.newDir}></Link>
                                    <input type="submit" name="create" value="Create" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewMovie
