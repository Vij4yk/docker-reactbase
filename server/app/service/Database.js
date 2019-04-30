import mysql from 'mysql'
import fs from 'fs'
import path from 'path'

const config = {
    user: 'root',
};

// load config.password and config database from .env file at top level
(function() {
    fs.readFile(path.resolve(__dirname, '../../../.env'), 'utf8', (err, data) => {
        if (err) {
            throw 'can not load mysql .env data'
        }
        
        data.split('\n').forEach(str => {
            // MYSQL_ROOT_PASSWORD=xxx 
            if (str.includes('MYSQL_ROOT_PASSWORD=')) {
                config.password = str.split('=')[1]
            }
            // MYSQL_DATABASE=xxx
            else if (str.includes('MYSQL_DATABASE=')) {
                config.database = str.split('=')[1]
            }
            // MYSQL_HOST=db
            else if (str.includes('MYSQL_HOST=')) {
                config.host = str.split('=')[1]
            }
            // MYSQL_PORT=3306
            else if (str.includes('MYSQL_PORT=')) {
                config.port = str.split('=')[1]
            }
        })
        
    })
})()

export default class Database {
    // createConnection config
    // host: 127.0.0.1
    // port: 3306
    // user: root
    // password: password
    // database: db
    constructor() {
        this.conn = mysql.createConnection(config)
        this.conn.connect((err) => {
            if (err) {
                throw 'can not connect to database (db not up / config problem)'
            }
        })
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, args, (err, res) => {
                if (err)
                    reject(err)
                resolve(res)
            })
        })
    }

    close() {
        return new Promise((resolve, reject) => {
            this.conn.end(err => {
                if (err)
                    reject(err)
                resolve()
            })
        })
    }
}
