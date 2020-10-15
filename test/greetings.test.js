let assert = require('assert');

let greetings = require('../greetings');

let greetingsFac = greetings()


const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_test';

const pool = new Pool({
    connectionString
});


let greetingsEX = greetings(pool)

describe('The Greetings App Factory Function', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from greetedusers;");
    });


    it("the langMessages() function should return a greeting message given a name and a language", function () {


        var actual = greetingsEX.langMessages("Lona", "IsiXhosa");
        var expected = "Molo Lona!";

        assert.equal(actual, expected)


    });

    it("the langMessages() function should return a greeting message given a name and a language", function () {


        var actual = greetingsEX.langMessages("Thimna", "English");
        var expected = "Hello Thimna!";

        assert.equal(actual, expected)


    });

    it("the langMessages() function should return a greeting message given a name and a language", function () {


        var actual = greetingsEX.langMessages("Lunga", "Afrikaans");
        var expected = "Halo Lunga!";

        assert.equal(actual, expected)


    });



    it('the addName() function should add a name to the greetedusers table ', async function () {

        var name = "Xhanti";

        await greetingsEX.addName(name);

        var actual = await greetingsEX.individualCounter(name);
        var expected = 1;

        assert.equal(actual, expected);

    });


    it('the nameCounter() function should add a name to the greetedusers table ', async function () {


        var actual = await greetingsEX.nameCounter();
        var expected = 0;



        assert.equal(actual, expected);

    });

    it('the indiCounter() function should add a name to the greetedusers table ', async function () {

        var name = "Namhla";

        await greetingsEX.addName(name);

        var actual = await greetingsEX.individualCounter(name);
        var expected = 1;

        assert.equal(actual, expected);

    });

    it('the getNames() function should select names from the greetedusers table ', async function () {

        var name = "Lutho";

        await greetingsEX.addName(name);

        var actual = await greetingsEX.getNames(name);
        var expected = [
            {
              names: 'Lutho'
            }
          ];

        assert.deepEqual(actual, expected);

    });

    it('the getNames() function should select names from the greetedusers table ', async function () {

        await greetingsEX.addName("Timmy");
        await greetingsEX.addName("vonny");
        await greetingsEX.addName("themba");

        // await greetingsEX.getNames();
        var expected =    [
            {
              "names": "Timmy"
            },
           {
             "names": "Vonny"
           },
           {
             "names": "Themba"
           }
          ]
   

        assert.deepEqual(await greetingsEX.getNames(), expected);

    });




    after(function () {
        pool.end();
    })
});
