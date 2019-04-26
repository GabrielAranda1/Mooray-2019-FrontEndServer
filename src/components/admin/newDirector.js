import React, { Component } from 'react'
import axios from 'axios'

class newDirector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            lastname: '',
            bio: '',
            picture: '',
            birthdate: '',
            deathdate: '',
            errors: {},
            performer_id: [],
            director_id: [],
            character_name: []
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const newDirector = {
            name: this.state.name,
            lastname: this.state.lastname,
            bio: this.state.bio,
            picture: this.state.picture,
            birthdate: this.state.birthdate,
            deathdate: this.state.deathdate,
        }

        axios.post('/api/directors/new', newDirector)
            .then(res => {
                if (res.status !== 400) {
                    window.location = "/admin/director/" + res.data.director_id
                }
            })
            .catch(err => this.setState({ errors: err.response.data }))
    }

    render() {
        return (
            <div className="newDirector">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 m-auto">
                            <h1 className="display-4 text-center text-white">New Director</h1>
                            <div className="card p-4 m-3">
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <small>Name</small>
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
                                        <small>Last Name</small>
                                        <input type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Last Name"
                                            id="lastname"
                                            name="lastname"
                                            required
                                            value={this.state.lastname}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <small>Biography</small>
                                        <textarea className="form-control form-control-lg"
                                            placeholder="Bio"
                                            name="bio"
                                            rows="6"
                                            maxLength="4999"
                                            value={this.state.bio}
                                            onChange={this.onChange}
                                        >
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <small>Picture</small>
                                        <input type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Picture"
                                            name="picture"
                                            id="picture"
                                            required
                                            value={this.state.picture}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <small>Birth Date</small>
                                        <input type="date"
                                            className="form-control form-control-lg"
                                            placeholder="Birth Date"
                                            name="birthdate"
                                            id="birthdate"
                                            required
                                            value={this.state.birthdate}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <small>Death Date</small>
                                        <input type="date"
                                            className="form-control form-control-lg"
                                            placeholder="Death Date"
                                            name="deathdate"
                                            id="deathdate"
                                            value={this.state.deathdate}
                                            onChange={this.onChange}
                                        />
                                    </div>
                                    <input type="submit" name="create" value="Create" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default newDirector