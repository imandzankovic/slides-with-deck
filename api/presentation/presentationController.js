var Presentation = require('./presentationModel');
const fs = require("fs")
var _ = require('lodash');

var path = require('path')
var Slide = require('../slides/slideModel');

exports.params = function (req, res, next, id, slideId) {

  console.log('SLIIIIIDE' + req.params.slideId)
  Presentation.findById(id)
    .then(function (presentation) {
      if (!presentation) {
        next(new Error('No presentation with that id'));
      } else {
        if (req.params.slideId != null) {

          console.log('FUNKCIJAAAA')
          var query = { id: req.params.slideId };
          console.log(query)
          Slide.findById(req.params.slideId)
            .then(function (slide) {
              if (!slide) {
                next(new Error('No slide with that id'));
              } else {
                console.log(slide)
                req.slide = slide;
                res.json(slide)
              }
            }, function (err) {
              next(err);
            });
        }
        else {
          console.log(req.body)
          req.presentation = presentation

          //console.log(req.presentation)
          next();
        }

      }
    }, function (err) {
      next(err);
    });

};


exports.get = function (req, res, next) {
  Presentation.find({}, '-__v')
    .then(function (presentations) {
      // res.render(path.resolve('/Users/Iman/Desktop/presis/d.html'), {

      // //  presentations:presentations
      // presentations:presentations

      // }, function (err, memo) {
      //   console.log(err);

      //   res.send(memo)
      // });
      console.log(presentations)
      res.send(presentations)

    }, function (err) {
      next(err);
    });
};
exports.getOne = function (req, res, next) {

  var presentation = req.presentation;
  res.json(presentation);


};


exports.put = function (req, res, next) {
  // var presentation = req.presentation;

  // var update = req.body;
    
  
  // _.merge(presentation, update);
  // console.log(presentation)

  // presentation.save(function (err, saved) {
  //   if (err) {
  //     next(err);
  //   } else {
  //     res.json(saved);
  //   }
  // })

  Presentation.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, presentation) {
    if (err) return next(err);
    //res.send('Presentation udpated.');
    res.json(presentation);
});

};

exports.post = function (req, res, next) {
  var newpresentation = req.body;
  console.log(newpresentation)
  Presentation.create(newpresentation)
    .then(function (presentation) {
      res.json(presentation);
    }, function (err) {
      next(err);
    });
};

exports.delete = async function (req, res, next) {
  req.presentation.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
