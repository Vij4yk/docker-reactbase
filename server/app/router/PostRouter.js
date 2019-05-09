import express from 'express'
 
import jwt from '../service/jwt'
import postService from '../service/PostService'
import Log from '../service/Log'

const router = express.Router()

const getPosts = (req, res) => {
    const { start, num } = req.query
    if (!start || !num) {
        res.send({
            error: 'need to specify start and num paramters'
        })
        return
    }
    
    postService.getPost(start, num)
    .then(posts => {
        if (posts.length == 0) {
            res.send({
                error: 'no more old posts'
            })
            return
        }

        const nextStartPostId = posts[posts.length - 1].id - 1
        posts.forEach(post => {
            post.avatar = 'http://' + req.get('Host') + '/api/u/' + post.unique_name_tag + '/avatar'
            delete post.id
        })
        res.send({
            posts,
            start: nextStartPostId || -1
        })
    })
    .catch(err => {
        res.send({
            error: 'no post found'
        })
        Log.err(err)
    })
}

router.get('/', getPosts)

module.exports = router
