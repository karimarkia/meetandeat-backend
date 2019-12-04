const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const config = require('./config')
const session = require('express-session')

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const mealRoutes = require('./api/meal/meal.routes')
const connectSockets = require('./api/socket/socket.routes')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);



let userCount = 0;

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
app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/meal', mealRoutes)
connectSockets(io)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
}
const logger = require('./services/logger.service')
const port = process.env.PORT || 3000;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});