var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PresentationSchema = new Schema({
    name: {
        type: String
    },
    title: {
        type: String
    },
    //slides: [SlidesSchema]
    slides: [{type: Schema.Types.ObjectId, ref: 'slide'}],

});

module.exports = mongoose.model('presentation', PresentationSchema)


