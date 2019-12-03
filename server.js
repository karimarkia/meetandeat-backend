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

const app = express()

var http = require('http').createServer(app);
var io = require('socket.io')(http);

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

// if (process.env.NODE_ENV === 'production') {
// Express will serve up production assets
// like our main.js file, or main.css file!
app.use(express.static(path.resolve(__dirname, 'public')));

io.on('connection', (socket) => {

    console.log('made socket connection', socket.id);

    socket.on('test event', data=>{
        console.log(data)
        io.emit('saying to all', data)
    });

    //socket.emit('chat newMsgs', msgs);

    userCount++;

    socket.on('disconnect', function () {
    userCount--;
    console.log('user disconnected', userCount);
    io.emit('chat newMsg', {txt: 'Someone just Left', from: 'System'});
    });
    

});

// io.on('connection', function (socket) {
//     console.log('a user connected', userCount);

//     socket.emit('chat newMsgs', msgs);

//     userCount++;
//     io.emit('chat newMsg', {txt: `New member, you are now ${userCount} `, from: 'System'});
//     socket.on('disconnect', function () {
//         userCount--;
//         console.log('user disconnected', userCount);
//         io.emit('chat newMsg', {txt: 'Someone just Left', from: 'System'});
//     });
//     socket.on('chat msg', function (msg) {
//         console.log('message: ' , msg);
//         msgs.push(msg);
//         io.emit('chat newMsgs', [msg]);

//         setTimeout(()=>{
//             socket.emit('chat newMsgs', [{from: 'System', txt: 'enterd the room'}]);
//         }, 1500) 

//     });

// });



module.exports = http