import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken'

let jwtSecret; // load from .env

(function() {
    fs.readFile(path.resolve(__dirname, '../../../.env'), 'utf8', (err, data) => {
        if (err) {
            throw 'can not load mysql .env data'
        }
        
        data.split('\n').forEach(str => {
            // MYSQL_ROOT_PASSWORD=xxx 
            if (str.includes('JWT_SECRET=')) {
                jwtSecret = str.split('=')[1]
            }
        })
        
    })
})()

module.exports = {

    sign: (payload) => {
        return jwt.sign(payload, jwtSecret)
    },

    verify: (token) => {
        return jwt.verify(token, jwtSecret)
    },

    decode: (token) => {
        return jwt.decode(token)
    }
}
