const express = require('express'),
      router = express.Router(),
      Campground = require('../models/campground'),
      Comment = require('../models/comment');

//COMMENT - ROUTES
router.get('/campgrounds/:id/comment/new', isUserLoggedIn , function(req, res){
    Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error)
        }else{
            res.render('comment/new', {campground: campground})
        }
    })
})

router.post('/campgrounds/:id/comment', isUserLoggedIn, function(req, res){
    //lookup campground using ID
    Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error)
        }else{
           //create new comments
           Comment.create(req.body.comment, function(error, comment){
               if(error){
                   console.log(error)
               }else{
                   //add username and id to comment
                   comment.author.id = req.user._id;
                   comment.author.username = req.user.username;
                   //save comment
                   comment.save();
                    campground.comments.push(comment)
                    campground.save();
                    //redirect to campground show page
                    res.redirect('/campgrounds/' + campground._id);
               }
           }) 
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