const   express = require('express'),
        app = express(),
        mongoose = require('mongoose'),
        passport = require('passport'),
        localStrategy = require('passport-local'),
        User = require('./models/user'),
        ejs = require('ejs'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        Campground = require('./models/campground'),
        Comment = require('./models/comment'),
        seedDB = require('./seeds');

const   commentRoutes = require('./routes/comments'),
        campgroundRoutes = require('./routes/campground'),
        authRoutes = require('./routes/auth');


//seedDB();

mongoose.connect('mongodb://localhost/yelpCamp_database');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/public'))

//PASSPORT - CONFIG
app.use(require('express-session')({
    secret: 'cats',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    next();
})

app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000, function(error){
    if(!error){
        console.log("Server started on port: 3000...");
    }else{
        console.log("SOMETHING WENT WRONG!");
        console.log(error);
    }
})