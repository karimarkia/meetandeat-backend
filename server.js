const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const config = require('./config')
const session = require('express-session')

// const authRoutes = require('./api/auth/auth.routes')
// const accountRoutes = require('./api/account/account.routes')
const mealRoutes = require('./api/meal/meal.routes')

const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

if (process.env.NODE_ENV !== 'production') {
    const corsOptions = {
        origin: 'http://localhost:8080',
        // origin: 'http://127.0.0.1:8080',
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
// app.use('/auth', authRoutes)
// app.use('/account', accountRoutes)
app.use('/api/meal', mealRoutes)

// if (process.env.NODE_ENV === 'production') {
// Express will serve up production assets
// like our main.js file, or main.css file!
app.use(express.static(path.resolve(__dirname, 'public')));

module.exports = app