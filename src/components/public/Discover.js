import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LastAdded from '../data/lastAdded'

class Discover extends Component {

    constructor() {
        super()
        this.state = {
            admin: false
        }
    }

    render() {
        return (
            <div className="container card card-mooray p-2 shadow-lg">
                <div className="col-m-5">
                    <h1 className="text-white">Last Added</h1>
                    <LastAdded admin={this.state.admin} />
                    <Link className="btn btn-primary m-2" to={"/public/catalog"}>Full List</Link>
                </div>
            </div>
        )
    }
}

export default Discover