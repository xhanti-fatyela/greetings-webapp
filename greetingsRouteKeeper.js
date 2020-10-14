module.exports = function greetRoutes() {

const pg = require("pg");


const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings';

const pool = new Pool({

  connectionString

})

const greetings = require('./greetings')
const greetFunction = greetings(pool)

async function homeRoute(req, res){

        // const nameCounter = await greetFunction.nameCounter()
        res.render('index');
      
      
}

async function forGreeted(req, res) {

    const greetName = req.body.greetName
  
    const greetRadio = req.body.greetRadioBtn
  
    if (greetName === '' && greetRadio === undefined) {
  
      req.flash('error', 'please enter name and select language')
      // return
  
    }
  
    else if (greetName === '') {
  
      req.flash('error', 'please enter name')
      // return
    }
  
    else if (greetRadio === undefined) {
  
      req.flash('error', 'please select language')
      // return
    } 
  
    else {
  
    
  
    const greetLang = await greetFunction.langMessages(greetName, greetRadio)
  
    await greetFunction.addName(greetName)
    
    const nameCounter = await greetFunction.nameCounter()
    res.render('index', {
  
      greet: greetLang,
      counter: nameCounter
  
    });
    return
  }
  res.render('index');
    // console.log(greetLang);
  
  }

  async function afterGreeted(req, res) {

    var eachUserNames = await greetFunction.getNames();
  
    res.render("greeted", {
      names: eachUserNames
    });
  }

  async function forCounter(req, res) {

    var username = req.params.username
  
    const indiCounter = await greetFunction.individualCounter(username)
  
  
    res.render('counter', { username, indiCounter })
  }

  async function forClearing (req, res) {

    await greetFunction.clearData();
  
  
    res.redirect('/')
  
  
  }

return {

    homeRoute,
    forGreeted,
    afterGreeted,
    forCounter,
    forClearing
}

}