import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'

import webpack from 'webpack'
import webpackMiddle from 'webpack-dev-middleware'
import webpackConfig from '../webpack.config'

const app = express()

app.use(webpackMiddle(webpack(webpackConfig)))
app.use(bodyParser.json())

app.use('/api/u', require('./app/router/UserRouter'))
app.use('/api/p', require('./app/router/PostRouter'))

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
})

app.listen(8080, '0.0.0.0', () => console.log('server started'))
