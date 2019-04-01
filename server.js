const express = require('express'),
    bodyparser = require('body-parser'),
    cors = require('cors'),
    apiroute = require('./server/routes/api.route'),
    expressSession = require('express-session'),
    webroute = require('./server/routes/web.route'),
    connection = require('./server/config/web.config'),
    path = require('path');



const app = express();

//session
app.use(expressSession({
    secret: 'mytoken',
    saveUninitialized: true,
    resave: true
}));


    /** to handle requrest and response with json format */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

/** to overcome cross origin */
app.use(cors());

//static files
app.use(express.static(path.join(__dirname,'./client')));

app.use('/api',apiroute);
app.use('/',webroute);


const port = process.env.port || 3000;
app.listen(port,() => {
    console.log(`nodejs server is running @ http://localhost:${port}`);
});

    