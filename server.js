const express = require('express');
const passport = require('passport')
const env = require('dotenv')
const connectDB = require('./config/db')
const router = require('./routes/api/users')
const profileRouter = require('./routes/api/profile')
const postRouter = require('./routes/api/posts')
const route = require('./middleware/route')


//load dotenv variables
env.config({
    path: './config/.env'
})
//connect database
connectDB()

const app = express();

app.use(passport.initialize())
require('./middleware/passport')(passport)

//body parser
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

//use routes
app.use('/api/users', router)
app.use('/api/profile', profileRouter)
app.use('/api/posts', postRouter)
app.use(route)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`server running on ${port}`);
})