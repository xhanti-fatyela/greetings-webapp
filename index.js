const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const greetings = require('./greetings')
const app = express();

const greetFunction = greetings()

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {

  res.render('index');

});

app.post('/', function (req, res) {

  const greetName = req.body.greetName
  const greetRadio = req.body.greetRadioBtn
  const greetCounter = req.body.myCounter

  const greetLang = greetFunction.langMessages(greetName, greetRadio)
  greetFunction.setName(greetName)
  const greetCount = greetFunction.counter()


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
















const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {

  console.log("App Started at port:", PORT)
})