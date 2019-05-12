import React, { Component } from 'react'

import axios from 'axios'
import Swal from 'sweetalert2'
import jwt_decode from 'jwt-decode'

class NewList extends Component {

    constructor() {
        super()
        this.state = {
            'user': localStorage.jwtToken ? jwt_decode(localStorage.jwtToken) : '',
            list_name: '',
            description: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount() {

        if (!this.state.user.id) {
            this.props.history.goBack();
        }

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

        axios.post(`/api/lists/${this.state.user.id}/new`, newList).then(res => {
            if (res.status !== 400 && res.data !== null) {
                Swal.fire({
                    type: 'success',
                    position: 'top',
                    text: `List ${res.data.list_name} created!`,
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    this.props.history.goBack();
                })
            }
        })
    }

    render() {
        return (
            <div className="newList">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 m-auto">
                            <h1 className="display-4 text-center text-white">New List</h1>
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
                                            rows="6"
                                            maxLength="249"
                                            value={this.state.description}
                                            onChange={this.onChange}
                                        >
                                        </textarea>
                                    </div>
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

export default NewList