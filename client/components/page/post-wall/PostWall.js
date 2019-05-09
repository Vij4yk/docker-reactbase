import React from 'react'

import PostBox from './PostBox'

export default class PostWall extends React.Component {
    constructor(propost) {
        super(propost)

        this.state = {
            posts: [],
            uid: 1,
            fetchStart: 0,
            fetchNum: 5,
            canFetch: true
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
        if (!this.state.canFetch) {
            return
        }

        fetch(`${document.URL}api/p?start=${this.state.fetchStart}&num=${this.state.fetchNum}`)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                this.setState({canFetch: false})
                console.log(data.error)
                return
            }

            this.setState({fetchStart: data.start})
            
            const newPosts = []
            data.posts.forEach((post, i) => {
                const utc = new Date(post.create_at)

                newPosts.push({
                    postId: this.state.uid + i,
                    user: {
                        uniqueId: post.unique_name_tag,
                        name: post.display_name,
                        avatar: post.avatar,
                    },
                    date: new Date(utc.getTime() - utc.getTimezoneOffset() * 60000),
                    post: post.message,
                    likes: post.likes,
                    comments: post.comments,
                })
            })

            this.setState({posts: [...this.state.posts, ...newPosts]})
            this.setState({uid: this.state.uid + data.posts.length})
        })
        .catch(err => {
            this.setState({canFetch: false})
            console.log(err)
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
