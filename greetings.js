module.exports = function greetings(pool) {

    var objMap = {};

    async function selectNames(name) {

        const INSERT_QUERY =  await pool.query('insert into greetedusers (name, persons_count) values ($1, $2)', [name, 1]);
    //   await pool.query(INSERT_QUERY, [name , 1]);
        

    }


    // async function nameQuery(name) {
    //     var INSERT_QUERY = "insert into greetedusers (name) values($1)"
    //     await pool.query(INSERT_QUERY, [name])
    // }

    async function counterQuery(username) {
        const SELECT_QUERY = 'Select name from users where name=$1'
        const UPDATE_QUERY = 'UPDATE users set greetedusers=greetedUsers+1  where name=$1 ';
        const user = await pool.query(SELECT_QUERY, [username])
        if (user.rows.length > 0) {
            await pool.query(UPDATE_QUERY, [username])
        }
        else {
            await addEntry(username)
        }

    }

    

    async function setName(name) {
        var lowerObj = name.toLowerCase()

        if (objMap[lowerObj] === undefined) {
            objMap[lowerObj] = 0;
        }

        objMap[lowerObj]++
    }

    async function langMessages(name, lang) {

       

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
        return objMap;
    }

    async function counter() {

        return Object.keys(objMap).length
    }




    async function clearObj() {
        objMap = {}
    }

    async function individualCounter(name){
       
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
        individualCounter,
        selectNames,
        // nameQuery,
        counterQuery

    }
}

