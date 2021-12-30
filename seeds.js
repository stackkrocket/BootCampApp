var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [{
    name: 'Goat Hill',
    image: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&h=350',
    description: 'Sed porttitor lectus nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.'
}, {
    name: 'Granite Hill',
    image: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&h=350',
    description: 'Sed porttitor lectus nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.'
}, {
    name: 'Big Foot Hill',
    image: 'https://images.pexels.com/photos/2108845/pexels-photo-2108845.jpeg?auto=compress&cs=tinysrgb&h=350',
    description: 'Sed porttitor lectus nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Cras ultricies ligula sed magna dictum porta.'
}]

    const seedDB = function(){

        //Remove all campground
        Campground.remove({}, function(error){
            if(error){
                console.log(error)
            }else{
                console.log('Removed campgrounds')
                 //add a few campground
                data.forEach(function(seed){
                Campground.create(seed, function(error, campground){
                    if(error){
                        console.log(error)
                    }else{
                        console.log('Added campgrounds!')

                        //add a few comments
                        Comment.create({
                            text: 'Cool place but no internet',
                            author: 'iStaackz'
                        }, function(error, comment){
                            if(error){
                                console.log(error)
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                            }
                        })
                    }
                })
            })

             }
        })
    }
    
module.exports = seedDB;