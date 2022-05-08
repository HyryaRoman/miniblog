const express = require('express')
const app = module.exports = express()
const path = require('path')

const port = process.env.PORT || 8080

app.engine('.html', require('ejs').__express)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./routers/pages.js'))
app.use(require('./routers/api.js'))

if (!module.parent) {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}
