import React, { Component } from 'react'
import Axios from 'axios'
import moment from 'moment'

class LastAddedPerformer extends Component {

    constructor() {
        super()
        this.state = {
            'performers': []
        }
    }

    componentDidMount() {
        this.getPerformers()
    }

    getPerformers() {
        Axios.get('/api/performers/data/last-added')
            .then(perfs => this.setState({ 'performers': perfs.data }))
    }

    render() {
        return (
            <div className="last-added">
                {this.state.performers.map(function (performer, index) {
                    return (
                        <img key={index}
                            className="img-size img-thumbnail m-2"
                            id={performer.performer_id}
                            src={performer.picture}
                            title={performer.name + " " + performer.lastname + "\n" + moment(performer.createdAt).format("LLLL")}
                            alt={performer.name + " " + performer.lastname + "\n" + moment(performer.createdAt).format("LLLL")}
                        >
                        </img>
                    )
                })}
            </div>
        )
    }
}

export default LastAddedPerformer