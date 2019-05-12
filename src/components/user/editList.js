import React, { Component } from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import moment from 'moment'

class EditList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list_id: '',
            'user': localStorage.jwtToken ? jwt_decode(localStorage.jwtToken) : '',
            list_name: '',
            description: '',
            movies: []
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.getMovies = this.getMovies.bind(this)
        this.listMovies = this.listMovies.bind(this)
        this.removeMovie = this.removeMovie.bind(this)
        this.deleteList = this.deleteList.bind(this)
    }

    componentDidMount() {
        if (!this.state.user.id) {
            this.props.history.goBack();
        }

        const list_id = this.props.match.params.list_id
        this.setState({ 'list_id': list_id })

        this.getMovies(list_id)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const newList = {
            list_name: this.state.list_name,
            description: this.state.description
        }

        axios.post(`/api/lists/${this.state.user.id}/${this.state.list_id}`, newList).then(res => {
            if (res.status !== 400 && res.data !== null) {
                Swal.fire({
                    type: 'success',
                    position: 'top',
                    text: `List ${this.state.list_name} updated!`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.props.history.goBack();
                })
            }
        })
    }

    getMovies(list_id) {
        if (list_id) {
            axios.get(`/api/lists/${list_id}/user=${this.state.user.id}`).then(res => {
                console.log(res.data)
                this.setState({ list_name: res.data.list.list_name, description: res.data.list.description })
                if (res.data.movies)
                    this.setState({ movies: res.data.movies })
            })
        }
    }

    listMovies() {
        const a = this
        if (this.state.movies.length > 0) {
            return (
                <div className="row p-2">
                    {this.state.movies.map(function (movie, index) {
                        return (
                            <figure key={index} className="d-inline-block" >
                                <img
                                    className="img-size img-thumbnail m-2 border-dark"
                                    id={movie.movie_id}
                                    src={movie.cover}
                                    title={movie.name + "\n" + moment(movie.createdAt).format("LLLL")}
                                    alt={movie.name + "\n" + moment(movie.createdAt).format("LLLL")}
                                >
                                </img>
                                <figcaption className="text-dark text-center"><button type="button" onClick={() => a.removeMovie(movie.movie_id)} className="btn btn-link">Remove</button></figcaption>
                            </figure>
                        )
                    })}
                    <a href="/public/catalog" className="btn btn-info ml-2 align-self-center mb-4"><i className="fas fa-plus"></i></a>
                </div>
            )
        } else {
            return (<button type="button" className="btn btn-info ml-2 align-self-center mb-4"><i className="fas fa-plus"></i></button>)
        }
    }

    removeMovie(movie_id) {
        if (movie_id) {
            axios.delete(`/api/lists/${this.state.user.id}/${this.state.list_id}/${movie_id}`).then(res => {
                if (res.data === 'Movie removed.') {
                    window.location.reload()
                }
            })
        }
    }

    deleteList() {
        if (this.state.list_id) {
            axios.delete(`/api/lists/${this.state.user.id}/${this.state.list_id}`).then(res => {
                if (res.data.success) {
                    Swal.fire({
                        type: 'success',
                        position: 'top',
                        text: res.data.success,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => this.props.history.goBack())
                }
            })
        }
    }

    render() {
        return (
            <div className="newList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 m-auto">
                            <h1 className="display-4 text-center text-white">Edit List</h1>
                            <div className="card p-4 m-3">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control form-control-lg"
                                            placeholder="List Name"
                                            id="list_name"
                                            name="list_name"
                                            required
                                            value={this.state.list_name}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg"
                                            placeholder="Description"
                                            name="description"
                                            rows="4"
                                            maxLength="249"
                                            value={this.state.description}
                                            onChange={this.onChange}
                                        >
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        {this.listMovies(this)}
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <input type="submit" name="create" value="Update" className="btn btn-info mt-4" />
                                            <button type="button" onClick={() => this.deleteList()} className="btn btn-danger mt-4 float-right"><i class="fas fa-trash"></i></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditList