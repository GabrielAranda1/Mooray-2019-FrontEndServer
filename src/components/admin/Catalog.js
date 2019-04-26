import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import LastAdded from '../data/lastAdded'
import LastUpdated from '../data/lastUpdated'

class Catalog extends Component {
  render() {
    return (
      <div className="catalog">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="col-sm-auto">
                <h1 className="text-white">Last Added</h1>
                <LastAdded admin={true} />
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-6">
              <div className="col-sm-auto">
                <h1 className="text-white">Last Updated</h1>
                <LastUpdated />
              </div>
            </div>

            <div className="col text-center align-middle">
              <div className="m-3">
                <Link className="btn btn-lg w-25 btn-primary" name="newMovie" to={"/admin/catalog/new-movie"}>New Movie</Link>
              </div>
              <div className="m-3">
                <Link className="btn btn-lg w-25 btn-primary" name="list" to={"/admin/catalog/list"}>Full List</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Catalog