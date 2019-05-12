import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

class PostList extends Component {

    constructor() {
        super()
        this.state = {
            'posts': [],
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
        this.getPosts(this.props.movie_id)
    }

    getPosts(movie_id) {
        axios.get('/api/posts/' + movie_id).then(posts => {
            this.setState({ 'posts': posts.data })
        })
    }
    /*
        checkLikes(post) {
    
            if (this.state.user) {
    
                axios.get('/api/posts/' + post.post_id + '/' + this.state.user + '/like').then(res => {
                    this.setState({ 'like': res.data })
                })
    
                if (this.state.like)
                    return <button className="text-primary btn btn-like post-footer" onClick={() => this.props.likePost(post.post_id)}> <i className="fa like fa-thumbs-up mr-2" aria-hidden="true"></i></button>
                else
                    return <button className="text-white btn btn-like post-footer" onClick={() => this.props.likePost(post.post_id)}> <i className="fa like fa-thumbs-up mr-2" aria-hidden="true"></i></button>
            }
        }
    */
    render() {
        return (
            <div className="posts">
                {this.state.posts.map((post, index) => {
                    return (
                        <div key={index} className="col-md-12 mb-5">
                            <div className="post-card shadow">
                                <div className="row">
                                    <div className="col-1">
                                        <a href={'http://localhost:8080/Cliente_Mooray/components/User?id=' + post.owner + '&operacao=CONSULTAR-PERFIL'}><img className="img-circle shadow" src={post.avatar} alt={post.username}></img></a>
                                    </div>
                                    <div className="col-11">
                                        <p className="post-user">{post.username}<button className="btn btn-link float-right" type="button" onClick={() => this.props.createReport(post.post_id, 'post')}><i className="float-right fa fa-flag" aria-hidden="true"></i></button></p>
                                        <small className="m-0 d-block">{moment(post.createdAt).fromNow()}</small>
                                    </div>
                                    <div className="col-12">
                                        <h2 className="mt-3">{post.title}</h2>
                                    </div>
                                    <div className="col-12">
                                        <p className="post-text">{post.text}</p>
                                    </div>
                                    <div className="col-12">
                                        <p className="post-footer">
                                            {/*this.checkLikes(index, post)*/}
                                            <button className="text-white btn btn-like post-footer" onClick={() => this.props.likePost(post.post_id)}> <i className="fa like fa-thumbs-up mr-2" aria-hidden="true"></i></button>
                                            {post.likes} <a className="text-white" href={'/api/posts/' + post.movie_id + '/' + post.post_id}><i className="ml-4 like fa fa-comments mr-2" aria-hidden="true"></i>{post.commentaries}</a>
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

export default PostList