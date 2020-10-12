module.exports = function greetings(pool) {


    async function addName(name) {
        
        name = name.toLowerCase();
        name = name.toUpperCase().charAt(0) + name.slice(1)

        var setNames = await pool.query('SELECT names FROM greetedusers WHERE names = $1', [name]);

        if (setNames.rowCount === 0) {
            await pool.query('INSERT INTO greetedusers (names, persons_count) values ($1, $2)', [name, 1]);

        } else {
            await pool.query('UPDATE greetedusers names SET persons_count = persons_count + 1 WHERE names = $1', [name]);
        }




    }



    async function nameCounter() {
        const count = await pool.query('select count (*) from greetedusers')
        return count.rows[0]["count"]
    }

    async function individualCounter(name) {

        var results = await pool.query('select persons_count from greetedusers where names=$1', [name])
        return results.rows[0]["persons_count"]
    }




    // async function setName(name) {
    //     var lowerObj = name.toLowerCase()

    //     if (objMap[lowerObj] === undefined) {
    //         objMap[lowerObj] = 0;
    //     }

    //     objMap[lowerObj]++
    // }

    function langMessages(name, lang) {
        name = name.toLowerCase();
        name = name.toUpperCase().charAt(0) + name.slice(1)

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

    async function getNames() {
        var eachName = await pool.query(`select names from greetedusers`)
        return eachName.rows
    }

    // async function counter() {

    //     return Object.keys(objMap).length
    // }




    async function clearData() {

        await pool.query(`delete from greetedusers`)

    }


    return {
        getNames,
        langMessages,
        clearData,
        individualCounter,
        addName,
        nameCounter

    }
}

