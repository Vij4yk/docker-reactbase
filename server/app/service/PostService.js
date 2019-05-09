import DB from './Database'

export default class PostService {
    // query descending order based on post create_at time, start = 0 will query the newest
    // otherwise start from post id = start
    static getPost(start, num) {
        return new Promise((res, rej) => {
            let db = new DB()
            
            let newestSql = 
            `select p.id, p.create_at, p.message, p.likes, p.comments,
            u.unique_name_tag, u.display_name
            from post p, user u
            where p.user_id = u.id
            order by p.id desc, p.create_at desc
            limit ${num}`

            let startFromSql = 
            `select p.id, p.create_at, p.message, p.likes, p.comments,
            u.unique_name_tag, u.display_name
            from post p, user u
            where p.user_id = u.id and p.id <= ${start}
            order by p.id desc, p.create_at desc
            limit ${num}`

            db.query(start == 0 ? newestSql : startFromSql)
            .then(posts => {
                db.close()
                res(posts)
            })
            .catch(err => {
                db.close()
                rej(err)
            })
        })
    }
}
