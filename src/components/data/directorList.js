import React, { Component } from 'react'
import Axios from 'axios'

class DirectorList extends Component {

    constructor() {
        super()
        this.state = {
            'directors': []
        }
    }

    componentDidMount() {
        this.getDirectors()
    }

    getDirectors() {
        Axios.get('/api/directors/all')
            .then(directors => this.setState({ 'directors': directors.data }))
    }

    render() {
        return (
            <select className="form-control form-control-lg"
                name="director_id"
                id="director_id"
                required
                onChange={this.props.onChange}
            >
                <option defaultValue disabled>Director</option>
                {this.state.directors.map(function (director, index) {
                    return (
                        <option key={index}
                            value={director.director_id}>
                            {director.name + " " + director.lastname}
                        </option>
                    )
                })}
            </select>
        )
    }
}

export default DirectorList