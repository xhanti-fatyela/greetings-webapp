create table greetedusers(
	id serial not null primary key,
	names text not null,
    persons_count int not null
);

-- my_products
-- password: pg123
-- codex


    
-- async function insertNames(name) {
--         const insertUsers = await pool.query('INSERT INTO greet_me (name, greet_counter) VALUES($1,$2)', [name, 1])
--             // return insertUsers.rows;
--     }

--     async function getNames(name) {
--         const users = await pool.query('select * from greet_me where name=$1', [name])
--         return users.rows;
--     }


--     async function checkName(name) {
--         const users = await pool.query('select name from greet_me where name=$1', [name])
--         return users.rowCount;
--     }
--     async function updateCounter(name) {
--         const userCounter = await pool.query('update greet_me set greet_counter = greet_counter + 1 where name=$1', [name]); /*update records */
--         return userCounter.rows
--     }

--     async function counter() {
--         const count = await pool.query('select greet_id from greet_me')
--         return count.rowCount
--     }

--     async function greetedUsersCount() {
--         const greetedUsers = await pool.query('')
--     }