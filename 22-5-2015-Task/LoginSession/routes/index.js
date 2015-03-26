var express = require('express');
var router = express.Router();
var loggedInUser = null;



/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'LoginSession' });
});


function checkSession(req, res, next){

    console.log("Inside Check Sessions");
    if(req.session.myUser){
        next();
    } else {
        console.log("checkSession Else")
        res.redirect('login/welcome');

    }
}


router.get('/login',  function(req, res){
    {
        console.log('simple get login');
        res.render('login/loginPage');
    }
});

router.get('/welcome', checkSession , function(req, res){
    {
        console.log('simple welcome');
        res.render('login/welcome', { userOnline : loggedInUser });
    }
});


router.post('/login', function(req, res){
    console.log('simple post login');
    loggedInUser = req.body.name;
    req.session.myUser = req.body.name;
    res.render('login/welcome', { userOnline : loggedInUser });
});

/*
router.get("/timeline", checkSession, function(req, res){
    res.send("Welcome to timeline <br/> <h2>"+ req.session.user +"</h2>");
});

router.get("/homePage", function(req, res){
    req.session.count = req.session.count || 0;
    res.send("Number of time visited = " + (++req.session.count));

});

*/
router.get("/signout", function(req, res){
    req.session.destroy();
    res.send("Signed Out");
});

module.exports = router;
