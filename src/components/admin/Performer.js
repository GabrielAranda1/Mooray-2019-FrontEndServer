import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LastAddedPerformer from '../data/lastAddedPerformer'
import LastUpdatedPerformer from '../data/lastUpdatedPerformer'

class Performer extends Component {
    render() {
        return (
            <div className="catalog">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="col-sm-auto">
                                <h1 className="text-white">Last Added</h1>
                                <LastAddedPerformer />
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div className="col-sm-auto">
                                <h1 className="text-white">Last Updated</h1>
                                <LastUpdatedPerformer />
                            </div>
                        </div>

                        <div className="col text-center align-middle">
                            <div className="m-3">
                                <Link className="btn btn-lg w-25 btn-primary" name="newPerformer" to={"/admin/performer/new-performer"}>New Performer</Link>
                            </div>
                            <div className="m-3">
                                <Link className="btn btn-lg w-25 btn-primary" name="list" to={"/admin/performer/list"}>Full List</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Performer