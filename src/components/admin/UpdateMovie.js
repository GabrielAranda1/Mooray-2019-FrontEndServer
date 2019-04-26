import React, { Component } from 'react'
import axios from 'axios'
import DirectorList from '../data/directorList'
import moment from 'moment'

class UpdateMovie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie_id: '',
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
    }

    componentDidMount() {
        const movie_id = this.props.match.params.movie_id

        axios.get('/api/movies/unique/' + movie_id)
            .then(res => {
                this.setState({
                    'movie_id': res.data.movie.movie_id,
                    'name': res.data.movie.name,
                    'description': res.data.movie.description,
                    'duration': String(res.data.movie.duration),
                    'cover': res.data.movie.cover,
                    'release_date': moment(res.data.movie.release_date).format("YYYY-MM-DD"),
                    'director_id': res.data.director[0].director_id
                })
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const updateMovie = {
            movie_id: this.state.movie_id,
            name: this.state.name,
            description: this.state.description,
            duration: this.state.duration,
            cover: this.state.cover,
            release_date: this.state.release_date,
            performer_id: this.state.performer_id,
            director_id: this.state.director_id,
            character_name: this.state.character_name,
        }

        console.log(updateMovie)
        axios.post('/api/movies/' + this.state.movie_id, updateMovie)
            .then(res => {
                if (res.status !== 400) {
                    window.location = "/admin/catalog/movie=" + this.state.movie_id
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
                            <h1 className="display-4 text-center text-white">Update Movie</h1>
                            <div className="card p-4 m-3">
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
                                    <input type="submit" value="Update" name="update" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UpdateMovie