import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import axios from 'axios'
import moment from 'moment'

class Reports extends Component {

    constructor() {
        super()
        this.state = {
            pending: [],
            reports: []
        }

        this.getReports = this.getReports.bind(this)
        this.listPendingReports = this.listPendingReports.bind(this)
        this.listSolvedReports = this.listSolvedReports.bind(this)
    }

    componentDidMount() {
        this.getReports()
    }

    getReports() {
        axios.get(`/api/reports/all`).then(reports => {
            if (!reports.data.error) {
                this.setState({ reports: reports.data })
            }
        })
    }

    listPendingReports() {
        if (this.state.reports) {
            return this.state.reports.map(function (report, index) {
                if (report.status === 'Pending') {
                    return (
                        <tr key={index}>
                            <th className="text-white"><a className="btn-link" href={`/admin/reports/${report.content_type}/${report.report_id}`}>{index}</a></th>
                            <th className="text-white"><a className="btn-link" href={`/admin/reports/${report.content_type}/${report.report_id}`}>{report.report_id}</a></th>
                            <td className="text-white">{report.type}</td>
                            <td className="text-white">{moment(report.createdAt).format("DD/MM/YYYY HH:MM:SS")}</td>
                            <td className="text-white">{report.name}</td>
                            <td className="text-white">{report.content_type}</td>
                            <td className="text-white">{report.reports}</td>
                            <td className="text-white">{report.status}</td>
                        </tr>
                    )
                }
            })
        } else
            return <img alt="loading" className="loader" src={process.env.PUBLIC_URL + '/ajax-loader.gif'}></img>
    }

    listSolvedReports() {
        console.log(this.state.reports)
        if (this.state.reports) {
            return this.state.reports.map(function (report, index) {
                if (report.status !== 'Pending') {
                    return (
                        <tr key={index}>
                            <th className="text-white">{index}</th>
                            <th className="text-white">{report.report_id}</th>
                            <td className="text-white">{report.type}</td>
                            <td className="text-white">{moment(report.updatedAt).format("DD/MM/YYYY HH:MM:SS")}</td>
                            <td className="text-white">{report.name}</td>
                            <td className="text-white">{report.content_type}</td>
                            <td className="text-white">{report.reports}</td>
                            <td className="text-white">{report.status}</td>
                        </tr>
                    )
                }
            })
        } else
            return <img alt="loading" className="loader" src={process.env.PUBLIC_URL + '/ajax-loader.gif'}></img>
    }

    render() {
        return (
            <div className="container-fluid">
                <Tabs>
                    <TabList className="navbar float-left shadow">
                        <Tab className="d-flex nav-head">Pending</Tab>
                        <Tab className="ml-3 d-flex nav-head">Solved</Tab>
                    </TabList>
                    <TabPanel>
                        <table className="table table-striped table-bordered">
                            <thead className="tb-head">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Report ID</th>
                                    <th scope="col">Cause</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Movie</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Reports</th>
                                    <th scope="col">Situation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.listPendingReports()}
                            </tbody>
                        </table>
                    </TabPanel>

                    <TabPanel>
                        <table className="table table-striped table-bordered">
                            <thead className="tb-head">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Report ID</th>
                                    <th scope="col">Cause</th>
                                    <th scope="col">Solve Date</th>
                                    <th scope="col">Movie</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Reports</th>
                                    <th scope="col">Situation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.listSolvedReports()}
                            </tbody>
                        </table>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}

export default Reports