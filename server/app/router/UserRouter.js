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

const validationRegistrationForm = async (form) => {
    const errors = {}

    if (!form.unique_name_tag) {
        errors.unique_name_tag = "unique_name_tag is required"
    } else if (!Validation.validateUserName(form.unique_name_tag)) {
        errors.unique_name_tag = "unique_name_tag must at least container 5 characters and includes only [digit, alphabet, -]"
    }

    if (!form.password) {
        errors.password = "password is required"
    }

    if(form.display_name && !Validation.validateUserName(form.display_name)) {
        errors.display_name = "display_name must at least container 5 characters and includes only [digit, alphabet, -]"
    }

    const users = await UserService.getUserByUniqueTag(form.unique_name_tag)
        .catch(err => {
            Log.err(err)
        })
    // unique tag check
    if (users.length != 0) {
        errors.unique_name_tag = "unique_name_tag already exist"
    }

    if (form.email && !Validation.validateEmail(form.email)) {
        errors.email = "invalid email"
    }

    if (form.avatar && !Validation.validateImage(form.avatar = form.avatar.buffer)) {
        errors.avatar = "unsupported image type"
    }

    return Object.keys(errors).length > 0 ? errors : null
} 

// process form-data, Content-Type: multipart/form-data
const registerUser = async (request, response) => {
    let body = request.body
    const user = {
        unique_name_tag: body.unique_name_tag,
        display_name: body.display_name || null,
        email: body.email || null,
        description: body.description || null,
        avatar: request.file || null,
        password: body.password
    }

    validationRegistrationForm(user)
    .then(err => {
        if (err) {
            response.send({errors: err})
        } else {
            if (!user.display_name) {
                user.display_name = user.unique_name_tag
            }
            if (user.description) {
                user.description = Helper.escapeHtml(user.description)
            }
            user.password = Helper.hash(user.password)

            // insert into db
            UserService.StoreUser(user)
            .then(() => {
                response.send({
                    result: 'OK'
                })
            })
            .catch((err) => {
                response.sendStatus(500)
                Log.err(err)
            })
        }
    })
    .catch((err) => {
        response.sendStatus(500)
        Log.err(err)
    })
}

router.get('/tag/:tag', getUser)
router.get('/tag/:tag/avatar', getAvatar)
router.post('/register', upload.single('avatar'), registerUser)

module.exports = router
