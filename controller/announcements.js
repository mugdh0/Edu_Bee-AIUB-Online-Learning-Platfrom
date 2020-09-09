var express 	= require('express');
var announcementsModel 	= require.main.require('./models/announcements');
var router 		= express.Router();

router.get('*', function(req, res, next){
	if(req.session.username == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.post('/', function(req, res){

  var datetime = new Date();
  //var time = "at "+datetime.toISOString().slice(11,19)+" in "+datetime.toISOString().slice(0,10);

  var announcements = {
    title 		: req.body.title,
    details	: req.body.details,
    name: req.session.username,
    time: datetime
  }

  announcementsModel.insert(announcements, function(status){
    if(status){
        res.redirect('/admin/index')
    }else{
      res.redirect('/signup');
    }
  });


});


module.exports = router;
