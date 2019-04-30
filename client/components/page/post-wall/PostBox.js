import React from 'react'

import Avatar from '../../share/Avatar'
import FontAwesomeBtn from '../../share/FontAwesomeBtn'

import './PostWall.css'

//props
// user = {
//      uniqueId: String,
//      name: 'String,
//      avatar: Image,
//      description: String
// },
// date: Date
class PostHeader extends React.Component {
    constructor(props) {
        super(props)
    }

    //https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time-eg-2-seconds-ago-one-week-ago-etc-best
    timeDifference(current, previous) {

        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;
    
        const elapsed = current - previous;
    
        if (elapsed < msPerMinute) {
             return Math.round(elapsed/1000) + ' seconds ago';   
        } else if (elapsed < msPerHour) {
             return Math.round(elapsed/msPerMinute) + ' minutes ago';   
        } else if (elapsed < msPerDay ) {
             return Math.round(elapsed/msPerHour ) + ' hours ago';   
        } else if (elapsed < msPerMonth) {
            return Math.round(elapsed/msPerDay) + ' days ago';   
        } else if (elapsed < msPerYear) {
            return Math.round(elapsed/msPerMonth) + ' months ago';   
        } else {
            return Math.round(elapsed/msPerYear ) + ' years ago';   
        }
    }

    render() {
        const curDate = new Date()
        const avatar = this.props.user.avatar
        return (
            <div>
                <div className="post-avatar-container d-inline-block">
                    <Avatar className="post-avatar" src={avatar}/>
                </div>
                <div className="ml-3 d-inline-block">
                    <h6>
                        {this.props.user.name}
                        &nbsp;
                        <a href="#"><i className="text-muted">@{this.props.user.uniqueId}</i></a>
                    </h6>
                    <i className="text-muted">{this.timeDifference.bind(this)(curDate, this.props.date)}</i>
                </div>
            </div>
        )
    }
}

// props
// post: String
class PostBody extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="border rounded m-2 p-3">{this.props.post}</div>
        )
    }
}

// props
// likes: Number
// comments: Number
class PostFooter extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="row p-2">
                <FontAwesomeBtn fontAwesome="fa fa-heart-o ml-3" text={this.props.likes} />
                <FontAwesomeBtn fontAwesome="fa fa-comment-o ml-3" text={this.props.comments} />
                {/* <FontAwesomeBtn fontAwesome="fa fa-share" text="" /> */}
            </div>
        )
    }
}

// a box of message including the message owner and the message
// prop 
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
export default class PostBox extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="mt-3 card">
                <div className="p-2">
                    <PostHeader user={this.props.post.user} date={this.props.post.date} />
                    <PostBody post={this.props.post.post}/>
                    <PostFooter likes={this.props.post.likes} comments={this.props.post.comments}/>
                </div>
            </div>
        )
    }
}
