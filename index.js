const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');
const greetings = require('./greetings')
const app = express();

const greetFunction = greetings()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {

  res.render('index');

});

// app.get('/', function (req, res) {
//   req.flash('info', 'Welcome');
//   res.render('index', {
//     title: 'Home'
//   })
// });
app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

app.post('/', function (req, res) {

  const greetName = req.body.greetName
  const greetRadio = req.body.greetRadioBtn
  const greetCounter = req.body.myCounter

  const greetLang = greetFunction.langMessages(greetName, greetRadio)
  greetFunction.setName(greetName)
  const greetCount = greetFunction.counter()

  if(greetName === '' && greetRadio === undefined){
     
     req.flash('error', 'please enter name and select language')

  }

  else if (greetName === ''){

    req.flash('error', 'please enter name')
  }

  else if (greetRadio === undefined){

    req.flash('error', 'please select language')
  }

  res.render('index', {

    greet: greetLang,
    counter: greetCount

  });

});

app.get('/greeted', function (req, res) {

  var names = greetFunction.getNames();
  for (const list in names) {

  }

  res.render("greeted", { name: names })


});

app.get('/counter/:username', function (req, res) {

  var username = req.params.username

  const indiCounter = greetFunction.individualCounter(username)

  res.render('counter', { username, indiCounter })
});
















const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {

  console.log("App Started at port:", PORT)
})