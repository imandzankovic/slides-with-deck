var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Slide=require('../slides/slideModel');


var ElementSchema = new Schema({
    id:{
        type: String
    },
    x: {
        type: Number
    },
    y: {
        type: Number
    },
    type: {
        type: String
        //default:'title'
    },
    value: {
        type: String
        //default:'value'
    }
   
    
});
var SlidesSchema = new Schema({
    slide: {
        type: String
    },
    elements : [ElementSchema]
});


var PresentationSchema = new Schema({
    name: {
        type: String
    },
    title: {
        type: String
    },
    slides: [SlidesSchema]

});

module.exports = mongoose.model('presentation', PresentationSchema)


