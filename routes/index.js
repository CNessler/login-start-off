var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
var validate = require('../lib/javascripts/validate.js');
var db = require('monk')(process.env.MONGOLAB_URI);
var userInfo = db.get('login');
var cookieSession = require('cookie-session');
/* GET home page. */
router.get('/', function(req, res, next) {
  var name = req.cookies.username;
  res.render('index', { title: 'Express' });
});

router.post('/', function (req, res, next) {
  var userName = req.body.userName;
  userInfo.findOne({username: req.body.userName}, function (err, data) {
    if (bcrypt.compareSync(req.body.password, data.password)){
      req.session.user = userName;
      res.redirect('/homepage');
    } else {
      res.render('index', {error: 'invalid entry'})
    }
  })
})

router.get('/signup', function (req, res, next) {
  res.render('signup');
})

router.get('/homepage', function (req, res, next) {
  res.render('homepage');
})

router.post('/signup', function (req, res, next) {
  var errorCheck = validate(req.body.userName, req.body.password, req.body.passCheck);
  if (errorCheck.length > 0){
    res.render('signup', {errors: errorCheck})
  } else {
    var crypted = bcrypt.hashSync(req.body.password, 8)
    userInfo.insert({username: req.body.userName, password: crypted})
    //insert info into database
    //hash password into database
    res.redirect('/homepage');
  }
})

module.exports = router;
