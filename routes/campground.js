const express = require('express');
      router = express.Router(),
      Campground = require('../models/campground');

router.get('/campgrounds', function(request, response){
    //get all campgrounds from database
    Campground.find({}, function(error, allCampgrounds){
        if(!error){
            response.render('campground/campgrounds', {campgrounds: allCampgrounds});
        }else{
            console.log(error);
        }
    })
})

//NEW - ROUTE
router.get('/campgrounds/new', isUserLoggedIn, function(request, response){
    response.render('campground/new');
})

router.post('/campgrounds', isUserLoggedIn, function(request, response){
    //Get data from form and add to the campground array
    var name = request.body.name;
    var image = request.body.image;
    var description = request.body.description;
    var author = {
        id: request.user._id,
        username: request.user.username
    };

    var newCampgrounds = {name: name, image: image, description: description, author: author};
    //create a new campground and save to database
    Campground.create(newCampgrounds, function(error, updatedCampground){
        if(!error){
            //redirect to the campground page
            console.log(updatedCampground);
            response.redirect('/campgrounds');
        }else{
            console.log(error);
        }
    })
})

//SHOW - ROUTE
router.get('/campgrounds/:id', function(req, res){
    Campground.findById(req.params.id).populate('comments').exec(function(error, foundCampground){
        if(error){
            console.log(error)
        }else{
            console.log(foundCampground)
            res.render('campground/show', {campground: foundCampground});
        }
    })


})

function isUserLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;