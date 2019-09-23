var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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



module.exports = mongoose.model('slide', SlidesSchema)



