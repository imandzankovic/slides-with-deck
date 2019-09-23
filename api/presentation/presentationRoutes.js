var router = require('express').Router();
var controller = require('./presentationController');
var slideController=require('../slides/slideController');

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

  // router.route('/slides/:slideId')
  // .get(slideController.get)
  // .post(slideController.post)


  router.route('/:id/slides/:slideId')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)
  



module.exports = router;