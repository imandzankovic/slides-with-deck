var Slide = require('./slideModel');
const fs = require("fs")
var _ = require('lodash');
var path = require('path')

exports.params = function (req, res, next, id) {

    Slide.findById(id)
    .then(function (slide) {
      if (!slide) {
        next(new Error('No slide with that id'));
      } else {
        req.slide = slide;
        next();
      }
    }, function (err) {
      next(err);
    });
};

exports.get = function (req, res, next) {
    Slide.find({}, '-__v')
    .then(function (slidesx) {
        res.render(path.resolve('/Users/Iman/Desktop/decki/test.html'), {
        
        //  slides:slides
        slidesx:slidesx

        }, function (err, memo) {
          console.log(err);
         
          res.send(memo)
        });
      //res.send(slidesx)
     
    }, function (err) {
      next(err);
    });
};
exports.getOne = function (req, res, next) {
  var slide = req.slide;
  res.json(slide);
};

exports.put = function (req, res, next) {
  // var slide = req.slide;

  // console.log(slide)
  // var update = req.body;
  // console.log(update)
  // _.merge(slide, update);

  // console.log(slide)
  // slide.save(function (err, saved) {
  //   if (err) {
  //     next(err);
  //   } else {
  //     res.json(saved);
  //   }
  // })

  Slide.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, slide) {
    if (err) return next(err);
    //res.send('Presentation udpated.');
    res.json(slide);
});
};

exports.post = function (req, res, next) {
  var newslide = req.body;
  console.log(newslide)
  Slide.create(newslide)
    .then(function (slide) {
      res.json(slide);
    }, function (err) {
      next(err);
    });
};

exports.delete = async function (req, res, next) {
  req.slide.remove(function (err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
