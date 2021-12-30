const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      User = require('../models/user');

router.get('/', function(request, response){
    response.render('landing');
})


//AUTHENTICATION
//=============
//Register Route
router.get('/register', function(req, res){
    res.render('register')
})

//Register route (post)
router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(error, user){
        if(error){
            console.log(error)
            return res.render('register')
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect('/campgrounds');
        })
    })
})

//Login form
router.get('/login', function(req, res){
    res.render('login')
})

router.post('/login', passport.authenticate("local", {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
}), function(req, res){
})

//logout route
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/campgrounds');
})

function isUserLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;