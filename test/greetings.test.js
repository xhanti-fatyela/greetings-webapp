let assert = require('assert');

let greetings = require('../greetings');

let greetingsFac = greetings()




describe("the Greetins Exercise", function () {


    it('greetings', function () {

        let greetingsEX = greetings()

        greetingsFac.langMessages("Xhanti", "English")
        greetingsFac.counter()
        greetingsEX.setName("Xhanti")


        assert.equal(greetingsEX.langMessages("Xhanti", "English", "!"), "Hello Xhanti!");
        assert.equal(1, greetingsEX.counter())



    });

    it("should greet with name entered & selected 'IsiXhosa'", function () {

        let greetingsEX = greetings()

        greetingsEX.langMessages("Lona", "IsiXhosa")

        assert.equal(greetingsEX.langMessages("Lona", "IsiXhosa", "!"), "Molo Lona!")


    });

    it("should greet with name entered & selected 'English'", function () {

        let greetingsEX = greetings()

        greetingsEX.langMessages("Andre", "English")

        assert.equal(greetingsEX.langMessages("Andre", "English", "!"), "Hello Andre!")



    });

    it("should greet with name entered & selected 'Afrikaans'", function () {

        let greetingsEX = greetings()

        greetingsEX.langMessages("Lona", "Afrikaans")

        assert.equal(greetingsEX.langMessages("Lona", "Afrikaans", "!"), "Halo Lona!")


    });

    it("counter should return the number of names entered", function () {

        let greetingsEX = greetings()

        greetingsEX.langMessages("Lona", "Afrikaans")
        greetingsEX.langMessages("Thimna", "English")
        greetingsEX.setName("Lona")
        greetingsEX.setName("Thimna")
        greetingsEX.counter("Lona", "Thimna")

        assert.equal(greetingsEX.counter(), 2)



    });




    it("conter should not increase the number name is duplicated ", function () {
 
        let greetingsEX = greetings()
        
    
        greetingsEX.setName("Lona")
        greetingsEX.setName("Lona")
        greetingsEX.counter("Lona", "Lona")
    
        greetingsEX.langMessages("lona", "English")
        greetingsEX.langMessages("lona", "English")
    
        assert.equal(greetingsEX.counter() , 1)
    
    
        
        
    
    });
});