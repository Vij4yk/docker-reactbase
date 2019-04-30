import React from 'react'

import PostBox from './PostBox'

export default class PostWall extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            uid: 1,
        }

        this.onScroll = this.onScroll.bind(this)
        this.fetchPosts = this.fetchPosts.bind(this)
    }

    componentDidMount() {
        this.fetchPosts()
        window.addEventListener("scroll", this.onScroll, false)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false)
    }

    onScroll() {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
            this.fetchPosts()
        }
    }

    // should fetch from backend
    fetchPosts() {
        this.setState({
            posts: [...this.state.posts,
                {
                    postId: this.state.uid,
                    user: {
                        uniqueId: 'admin',
                        name: 'Liang Wu',
                        avatar: null,
                    },
                    date: Date.parse('04 Dec 1995 00:12:00 GMT'),
                    post: 'test post',
                    likes: 0,
                    comments: 0,
                },
                {
                    postId: this.state.uid + 1,
                    user: {
                        uniqueId: 'admin',
                        name: 'Liang Wu',
                        avatar: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                    },
                    date: Date.parse('04 Dec 1995 00:12:00 GMT'),
                    post: 'test post',
                    likes: 0,
                    comments: 0,
                } 
            ],
            uid: this.state.uid + 2,
        })
    }

    // post = {
    //     postId: Number,
    //     user: {
    //         uniqueId: String,
    //         name: 'String,
    //         avatar: Image,
    //     },
    //     date: Date
    //    post: String
    //    likes: Number
    //    comments: Number
    // }
    render() {
        return (
            <div id="post-wall">
                {this.state.posts.map((post, key) => 
                    <PostBox post={post} key={post.postId} />
                )}
            </div>
        )
    }
}
