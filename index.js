const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('express-flash');
const session = require('express-session');

const app = express();

const Homeroute = require("./greetingsRouteKeeper")
const homeroute = Homeroute()

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

app.get('/', homeroute.homeRoute);


app.post('/', homeroute.forGreeted);

app.get('/greeted', homeroute.afterGreeted);


app.get('/counter/:username', homeroute.forCounter);

app.get('/clear', homeroute.forClearing);



const PORT = process.env.PORT || 3015;

app.listen(PORT, function () {

  console.log("App Started at port:", PORT)
})