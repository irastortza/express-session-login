var express = require('express');
var router = express.Router();
const json = require('../datubase.json');
const session = require('express-session');
const sess = {
  secret: 'ausazko hitz multzoa',
  cookie: {}
}
router.use(session(sess))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function existitzenDa(user,pass) {
  let itzuli = false;
  json.forEach( bakoitza => {
      if (bakoitza.username == user & bakoitza.password == pass) {
          itzuli=true;
          return;
      }
  })
  return itzuli;
}

router.post('/egiaztapena',(req,res) => {
  let username = req.body.username
  let password = req.body.password

  let ondo = true;
  res.setHeader('Content-Type', 'application/json');
  if (! existitzenDa(username,password)) ondo=false;
  res.end(JSON.stringify({ erantzuna: ondo }));
})

router.get('/protected',(req,res) => {

  if(req.session.userid){
      res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  }else
      res.redirect('form.html')
});

router.post('/user',(req,res) => {
  if(existitzenDa(req.body.username, req.body.password)){
      req.session.userid=req.body.username;
      console.log(req.session)
      res.redirect('/protected');
  }
  else{
      res.send('Invalid username or password');
  }
})

router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

router.get("/", (req, res) => {
  res.send("Hello World");
})

module.exports = router;
