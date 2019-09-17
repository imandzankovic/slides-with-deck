var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Slide = require('../slides/slideModel');
var PresentationSchema = new Schema({
    name: {
        type: String
    },
    title: {
        type: String
    },
    slides: [Slide.schema]

});

module.exports = mongoose.model('presentation', PresentationSchema)


