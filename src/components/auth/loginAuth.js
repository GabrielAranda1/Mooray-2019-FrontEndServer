import React, { Component } from 'react'
import queryString from 'query-string'
import { loginBridge } from '../action/authActions'

class loginAuth extends Component {

    componentDidMount() {

        const user_id = this.props.match.params.user_id
        const origin = this.props.match.params.origin

        loginBridge(user_id).then(res => {

            if (res.role === 'ADMIN')
                window.location = '/admin/dashboard'

            else {
                if (origin === 'discover')
                    window.location = '/public/discover'

                else if (origin === 'catalog') {
                    const values = queryString.parse(this.props.location.search)
                    window.location = `/public/movie/${values.movie}`
                } else if (origin === 'edit-list') {
                    const values = queryString.parse(this.props.location.search)
                    window.location = `/user/lists/list=${values.list}`
                }

                else
                    window.location = '/user/' + user_id + '/activity'
            }
        })

    }

    render() {
        return (
            <p className="text-white">Redirecting....</p>
        )
    }
}

export default loginAuth