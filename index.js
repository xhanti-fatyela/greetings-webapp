const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');
const greetings = require('./greetings')
const app = express();

const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings';

const pool = new Pool ({

  connectionString

})
const greetFunction = greetings(pool)

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


app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

app.post('/', async function (req, res) {

   const greetName = req.body.greetName

  console.log(greetName)
  const greetRadio = req.body.greetRadioBtn

    await greetFunction.addName(greetName)
    const greetLang = await greetFunction.langMessages(greetName, greetRadio)
    const nameCounter = await greetFunction.nameCounter()


  if (greetName === '' && greetRadio === undefined) {

    req.flash('error', 'please enter name and select language')

  }

  else if (greetName === '') {

    req.flash('error', 'please enter name')
  }

  else if (greetRadio === undefined) {

    req.flash('error', 'please select language')
  }

  res.render('index', {

    greet: greetLang,
    counter: nameCounter

  });
    


});

app.get('/greeted', async function (req, res) {

  var eachUserNames = await greetFunction.getNames();

    res.render("greeted", {
        names: eachUserNames
    });
});


app.get('/counter/:username',async function (req, res) {

  var username = req.params.username

  const indiCounter = await greetFunction.individualCounter(username)


  res.render('counter', { username, indiCounter })
});

app.get('/clear', async function (req, res) {

  await greetFunction.clearData();
 

  res.redirect('/')


});












const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {

  console.log("App Started at port:", PORT)
})