import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../action/authActions'
import jwt_decode from 'jwt-decode'

class AdminNavbar extends Component {

    constructor() {
        super()
        this.state = {
            'admin': {}
        }
    }

    componentDidMount() {

        if (localStorage.jwtToken) {

            // Decode token
            this.setState({ 'admin': jwt_decode(localStorage.jwtToken) })

        } else {
            // Not logged in 
            window.location = 'http://localhost:8080/Cliente_Mooray/components/index.jsp'
        }
    }

    onLogoutClick(e) {
        e.preventDefault()
        logoutUser()
        window.location = 'http://localhost:8080/Cliente_Mooray/components/index.jsp'
    }

    render() {

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4 shadow">
                <div className="container">
                    <Link className="navbar-brand p-1 bg-light img-circle" to="/admin/dashboard">
                        <img className="d-block" width="45" height="45" alt="Mooray" src={process.env.PUBLIC_URL + "/mooray_ico.png"}></img>
                    </Link>

                    <div className="collapse navbar-collapse ml-sm-2" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" name="dashboard" to="/admin/dashboard"> Dashboard</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" name="catalog" to="/admin/catalog"> Catalog</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" name="users" to="/admin/users"> Users</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" name="reports" to="/admin/reports"> Reports</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" name="performers" to="/admin/performer"> Performers</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" name="directors" to="/admin/director"> Directors</Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <div className="navbar-brand p-1 bg-light img-circle" to="/admin/dashboard">
                                    <img className="d-block rounded-circle" width="30" height="30" alt="/" src={this.state.admin.avatar}></img>
                                </div>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" onClick={this.onLogoutClick.bind(this)} name="logout" href="http://localhost:8080/Cliente_Mooray/components/index.jsp">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default AdminNavbar