import React, { Component } from 'react'
import axios from 'axios';
import moment from 'moment'
import Swal from 'sweetalert2'

class CheckReport extends Component {

    constructor() {
        super()

        this.state = {
            report: {},
            type: '',
            content_id: ''
        }

        this.getReport = this.getReport.bind(this)
        this.renderReport = this.renderReport.bind(this)
        this.sendResult = this.sendResult.bind(this)
    }

    componentWillMount() {
        const type = this.props.match.params.type
        const content_id = this.props.match.params.content_id

        this.setState({ type: type, content_id: content_id })

        this.getReport(type, content_id)
    }

    getReport(type, content_id) {
        if (type && content_id) {
            axios.get(`/api/reports/${type}/${content_id}`).then(report => {
                if (!report.data.error) {
                    this.setState({ report: report.data })
                }
            })
        }
    }

    renderReport() {
        if (this.state.report) {

            if (this.state.type === 'post') {
                return (
                    <div className="col-md-12 mb-5">
                        <div className="post-card shadow">
                            <div className="row">
                                <div className="col-1">
                                    <a href={'http://localhost:8080/Cliente_Mooray/components/User?id=' + this.state.report.owner + '&operacao=CONSULTAR-PERFIL'}><img className="img-circle shadow" src={this.state.report.avatar} alt={this.state.report.username}></img></a>
                                </div>
                                <div className="col-11">
                                    <p className="post-user">{this.state.report.username}<button className="btn btn-link float-right" type="button"><i className="float-right fa fa-flag" aria-hidden="true"></i></button></p>
                                    <small className="m-0 d-block">{moment(this.state.report.createdAt).fromNow()}</small>
                                </div>
                                <div className="col-12">
                                    <h2 className="mt-3">{this.state.report.title}</h2>
                                </div>
                                <div className="col-12">
                                    <p className="post-text">{this.state.report.text}</p>
                                </div>
                                <div className="col-12">
                                    <p className="post-footer">
                                        {/*this.checkLikes(index, post)*/}
                                        <button className="text-white btn btn-like post-footer"> <i className="fa like fa-thumbs-up mr-2" aria-hidden="true"></i></button>
                                        {this.state.report.likes} <a className="text-white" href={'/api/posts/' + this.state.report.movie_id + '/' + this.state.report.post_id}><i className="ml-4 like fa fa-comments mr-2" aria-hidden="true"></i>{this.state.report.commentaries}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else if (this.state.type === 'review') {

                return (
                    <div className="col-md-12 p-4">
                        <div className="post-card shadow">
                            <div className="row">
                                <div className="col-1">
                                    <a href={'http://localhost:8080/Cliente_Mooray/components/User?id=' + this.state.report.owner + '&operacao=CONSULTAR-PERFIL'}><img className="img-circle shadow" src={this.state.report.avatar} alt={this.state.report.username}></img></a>
                                </div>
                                <div className="col-11">
                                    <p className="post-user">{this.state.report.username}<button className="btn btn-link float-right"><i className="float-right fa fa-flag" aria-hidden="true"></i></button></p>
                                    <small className="m-0 d-block">{moment(this.state.report.createdAt).fromNow()}</small>
                                </div>
                                <div className="col-12">
                                    <p className="post-text">{this.state.report.text}</p>
                                </div>
                                <div className="col-12">
                                    <p className="post-footer">
                                        <button className="text-white btn btn-like post-footer"> <i className="fa like fa-thumbs-up mr-2" aria-hidden="true"></i></button>
                                        {this.state.report.likes} <a className="text-white" href={'/api/reviews/' + this.state.report.movie_id + '/' + this.state.report.review_id}><i className="ml-4 like fa fa-comments mr-2" aria-hidden="true"></i>{this.state.report.commentaries}</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }

        } else
            return <img alt="loading" className="loader" src={process.env.PUBLIC_URL + '/ajax-loader.gif'}></img>
    }

    sendResult(result) {
        if (result) {
            axios.post(`/api/reports/result/${this.state.report.report_id}/${result}?user=${this.state.report.owner}`).then(res => {
                if (!res.data.error) {
                    Swal.fire({
                        position: 'top',
                        type: 'success',
                        title: res.data,
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => window.location = '/admin/reports')
                } else {
                    Swal.fire({
                        position: 'top',
                        type: 'info',
                        title: res.data.error,
                        showConfirmButton: true,
                    })
                }
            })
        }
    }

    render() {
        return (
            <div>
                <div className="container">
                    <button className="btn btn-primary mb-4" onClick={() => window.location = '/admin/reports'}><i className="fas fa-arrow-left"></i></button>
                </div>
                <div className="container card-mooray">
                    {this.renderReport()}
                </div>
                <div className="container">
                    <div className="row">
                        <button className="btn btn-danger mt-3" onClick={() => this.sendResult('Delete')}>Delete {this.state.type}</button>
                        <button className="btn btn-danger mt-3 ml-3" onClick={() => this.sendResult('Suspend')}>Suspend Account</button>
                        <button className="btn btn-danger mt-3 ml-3" onClick={() => this.sendResult('Dismiss')}>Dismiss</button>
                    </div>
                </div>
            </div >
        )
    }
}

export default CheckReport