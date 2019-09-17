var router = require('express').Router();

// api router will mount other routers
// for all our resources



router.use('/slides', require('./slides/slideRoutes'));
router.use('/presentation', require('./presentation/presentationRoutes'));

module.exports = router;
