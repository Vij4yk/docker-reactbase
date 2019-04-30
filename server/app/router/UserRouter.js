import express from 'express'
import fs from 'fs'
import path from 'path'
import multer from 'multer'

import UserService from '../service/UserService'
import Log from '../service/Log'
import Validation from '../service/Validation'
import Helper from '../service/Helper'

const router = express.Router()
const upload = multer({storage: multer.memoryStorage()}) // store in memory

// send result
// {
//     "unique_name_tag": "aaa",
//     "display_name": "liang",
//     "create_at": "2019-04-28T07:15:38.000Z",
//     "description": null
// }
const getUser = (request, response) => {
    UserService.getUserByUniqueTag(request.params.tag)
    .then(users => {
        const user = users[0]
        if (user) {
            delete user.id
            delete user.password
            delete user.email
            user.avatar = 'http://' + request.get('Host') + request.originalUrl + '/avatar' // use the link of avatar instead of sending blob
            response.send(user)
        } else {
            response.send({
                error: 'user does not exist'
            })
        }
    })
    .catch(err => {
        response.send({
            error: 'user does not exist'
        })
        Log.err(err)
    })
}

let noAvatarJpg; // use this image if the user has no avatar uploaded
(function() {
    fs.readFile(path.resolve(__dirname, '../../img/question_mark.jpg'), (err, data) => {
        if (err) {
            Log.err('no-avatart.jpg path not exist')
        }
        noAvatarJpg = data
    })
})()

// send result avatar image to u/:tag/avatar
const getAvatar = (request, response) => {
    UserService.getUserByUniqueTag(request.params.tag)
    .then(users => {
        const user = users[0]
        if (user) {
            response.writeHead(200, {'Content-Type': 'image/jpg'})
            let avatar = user.avatar
            if (avatar) {
                response.end(avatar, 'binary')
            } else {
                response.end(noAvatarJpg, 'binary')
            }
        } else {
            response.send({
                error: 'user does not exist'
            })
        }
    })
    .catch(err => {
        response.send({
            error: 'user does not exist'
        })
        Log.err(err)
    })
}

// process form-data, Content-Type: multipart/form-data
const registerUser = async (request, response) => {
    let body = request.body
    const user = {
        unique_name_tag: body.unique_name_tag,
        display_name: body.display_name || body.unique_name_tag,
        email: body.email || null,
        description: body.description || null,
        avatar: request.file || null,
        password: body.password
    }

    // required fields
    if (!user.unique_name_tag || ! user.password) {
        response.send({
            error: "require fields: [unique_name_tag, password]"
        })
        return
    }

    if (!Validation.validateUserName(user.unique_name_tag) ||
        !Validation.validateUserName(user.display_name)) {
        response.send({
            error: "invalid unique_name_tag / display_name"
        })
        return   
    }

    const users = await UserService.getUserByUniqueTag(user.unique_name_tag)
        .catch(err => {
            response.send({
                error: 'invalid unique_name_tag'
            })
            Log.err(err)
        })
    // unique tag check
    if (users.length != 0) {
        response.send({
            error: "unique_name_tag already exist"
        })
        return
    }

    // email validation
    if (user.email && !Validation.validateEmail(user.email)) {
        response.send({
            error: "invalid email"
        })
        return   
    }

    // html escape description
    if (user.description) {
        user.description = Helper.escapeHtml(user.description)
    }

    // check avatar file
    if (user.avatar && !Validation.validateImage(user.avatar = user.avatar.buffer)) {
        response.send({
            error: "unsupported image type"
        })
        return
    }
    
    // hash password
    user.password = Helper.hash(user.password)

    // insert into db
    UserService.StoreUser(user)
    .then(() => {
        response.sendStatus(200)
    })
    .catch((err) => {
        response.send({
            error: "upload profile failed"
        })
        Log.err(err)
    })
}

router.get('/tag/:tag', getUser)
router.get('/tag/:tag/avatar', getAvatar)
router.post('/register', upload.single('avatar'), registerUser)

module.exports = router
