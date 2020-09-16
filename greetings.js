module.exports = function greetings() {

    var objMap = {};

    function setName(name) {
        var lowerObj = name.toLowerCase()

        if (objMap[lowerObj] === undefined) {
            objMap[lowerObj] = 0;
        }

        objMap[lowerObj]++
    }

    function langMessages(name, lang) {
        if (lang === "IsiXhosa") {
            return "Molo " + name + "!"
        }
        if (lang === "English") {
            return "Hello " + name + "!"
        }
        if (lang === "Afrikaans") {
            return "Halo " + name + "!"
        }
    }

    function getNames() {
        return objMap;
    }

    function counter() {
        return Object.keys(objMap).length
    }




    function clearObj() {
        objMap = {}
    }

    function individualCounter(name){
       
        for (const key in objMap) {
            if (key === name) {
                var element = objMap[key];
                
            }
        }
        
        return element
    }

    return {
        setName,
        getNames,
        counter,
        langMessages,
        clearObj,
        individualCounter

    }
}

