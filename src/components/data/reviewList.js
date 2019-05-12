import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

class ReviewList extends Component {

    constructor() {
        super()
        this.state = {
            'reviews': [],
            'movie': '',
            'props': {},
            'user': '',
            'like': false
        }
    }

    componentDidMount() {
        //this.checkLikes = this.checkLikes.bind(this)
        this.setState({ 'movie': this.props.movie_id })
        this.setState({ 'props': this.props })
        this.setState({ 'user': this.props.user_id })
        this.getReviews(this.props.movie_id)
    }

    getReviews(movie_id) {
        if (movie_id) {
            axios.get('/api/reviews/' + movie_id).then(posts => {
                this.setState({ 'reviews': posts.data })
            }).catch(() => { alert("Couldn't fetch review data from server") })
        }
    }

    render() {
        return (
            <div className="posts">
                {this.state.reviews.map((review, index) => {
                    return (
                        <div key={index} className="col-md-12 mb-5">
                            <div className="post-card shadow">
                                <div className="row">
                                    <div className="col-1">
                                        <a href={'http://localhost:8080/Cliente_Mooray/components/User?id=' + review.owner + '&operacao=CONSULTAR-PERFIL'}><img className="img-circle shadow" src={review.avatar} alt={review.username}></img></a>
                                    </div>
                                    <div className="col-11">
                                        <p className="post-user">{review.username}<button onClick={() => this.props.createReport(review.review_id, 'review')} className="btn btn-link float-right"><i className="float-right fa fa-flag" aria-hidden="true"></i></button></p>
                                        <small className="m-0 d-block">{moment(review.createdAt).fromNow()}</small>
                                    </div>
                                    <div className="col-12">
                                        <p className="post-text">{review.text}</p>
                                    </div>
                                    <div className="col-12">
                                        <p className="post-footer">
                                            {/*this.checkLikes(index, post)*/}
                                            <button className="text-white btn btn-like post-footer" onClick={() => this.props.likeReview(review.review_id)}> <i className="fa like fa-thumbs-up mr-2" aria-hidden="true"></i></button>
                                            {review.likes} <a className="text-white" href={'/api/reviews/' + review.movie_id + '/' + review.post_id}><i className="ml-4 like fa fa-comments mr-2" aria-hidden="true"></i>{review.commentaries}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default ReviewList