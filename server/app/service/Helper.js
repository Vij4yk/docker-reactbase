import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

let hash_secret
(function() {
    fs.readFile(path.resolve(__dirname, '../../../.env'), 'utf8', (err, data) => {
        if (err) {
            throw 'can not load .env data'
        }
        
        data.split('\n').forEach(str => {
            // PASSWORD_HASH_SECRET=xxx 
            if (str.includes('PASSWORD_HASH_SECRET=')) {
                hash_secret = str.split('=')[1]
            }
        })
        
    })
})()

export default class Helper {

    // null or escape the string
    static escapeHtml(unsafe = String) {
        return unsafe
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    static hash(str = String) {
        return crypto.createHmac('sha512', hash_secret)
            .update(str)
            .digest('hex')
    }
}
