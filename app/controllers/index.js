var express = require('express')
var router = express.Router()

// one day we could load a more modular set of routes with something like
// router.use('/comments', require('./comments'))

router.get('/', function(req, res) {
  res.render('home')
})

module.exports = router
