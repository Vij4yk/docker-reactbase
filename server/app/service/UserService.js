import DB from './Database'

export default class UserService {

    // resolve an array, but should have only one user object or empty
    static getUserByUniqueTag(tag = String) {
        return new Promise((resolve, reject) => {
            let db = new DB()
            db.query(`SELECT * FROM user WHERE unique_name_tag='${tag}'`)
            .then((users) => {
                db.close()
                resolve(users)
            })
            .catch(err => {
                db.close()
                reject(err)
            })
        })
    }

    static StoreUser(user = {
        unique_name_tag: String, // not null
        display_name: String, // not null
        email: String,
        description: String, 
        avatar: Blob, 
        password: String, // not null
    }) {
        return new Promise((resolve, reject) => {
            let db = new DB()
            let sql = `INSERT INTO user (unique_name_tag, display_name, email, description, avatar, password) VALUES ?`

            db.query(sql, [[Object.values(user)]])
            .then(resolve)
            .catch(reject)
        })
    }
}
