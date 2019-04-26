import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { logoutUser } from '../action/authActions'
import jwt_decode from 'jwt-decode'

class UserNavBar extends Component {
    constructor() {
        super()
        this.state = {
            'auth': false,
            'user': {}
        }
    }

    componentDidMount() {

        if (localStorage.jwtToken) {
            // Set authentication to true
            this.setState({ 'auth': true })

            // Decode token
            this.setState({ 'user': jwt_decode(localStorage.jwtToken) })
        }
    }

    onLogoutClick(e) {
        e.preventDefault()
        logoutUser()
        window.location = 'http://localhost:8080/Cliente_Mooray/components/index.jsp'
    }

    render() {

        const guest = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" href="http://localhost:8080/Cliente_Mooray/components/register.jsp">Sign Up</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="http://localhost:8080/Cliente_Mooray/components/login.jsp">Login</a>
                </li>
            </ul>
        )

        const loggedIn = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <div className="navbar-brand p-1 bg-light img-circle">
                        <a href={'http://localhost:8080/Cliente_Mooray/components/User?id=' + this.state.user.id + '&operacao=CONSULTAR-PERFIL'}><img className="d-block rounded-circle" width="30" height="30" alt="/" src={this.state.user.avatar}></img></a>
                    </div>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.onLogoutClick.bind(this)} name="logout" href="http://localhost:8080/Cliente_Mooray/components/index.jsp">Logout</a>
                </li>
            </ul>
        )

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4 shadow">
                <div className="container">
                    <Link className="navbar-brand p-1 bg-light img-circle" to="index.jsp">
                        <img className="d-block" width="45" height="45" alt="Mooray" src={process.env.PUBLIC_URL + "/mooray_ico.png"}></img>
                    </Link>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-default m-1 img-circle" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                    </form>

                    <div className="collapse navbar-collapse ml-sm-2" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/public/discover"><i className="far fa-compass"></i> Discover</a>
                            </li>
                        </ul>
                        {this.state.auth ? loggedIn : guest}
                    </div>
                </div>
            </nav>
        )
    }
}

export default UserNavBar