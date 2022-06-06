const express = require("express");
const { errorMonitor } = require("pg/lib/query");
const app = express();
const pool = require("./db.js");

app.use(express.json()) //request body to access data from client side

//Routes or SQL queries function

// select all data

app.get("/CRUDapi", async(req,res) => {
    try {
        const allUser = await pool.query(`SELECT * FROM tbl_userinfo`);
        res.json(allUser.rows);
    } catch (err) {
        console.log(err.message);
    }
})

// select specific data

app.get("/CRUDapi/:id", async(req,res) => {
    const {id} = req.params;
    try {
        const getUser = await pool.query(`SELECT * FROM tbl_userinfo WHERE userinfo_id = ${id}`);
        res.json(getUser.rows);
    } catch (err) {
        console.log(err.message);
    }
})

//update 

app.put("/CRUDapi/:id", async(req,res) =>{
    const {id} = req.params;

    try {
        const update = await pool.query(`UPDATE tbl_userinfo SET firstname = '${req.body.firstname}' , middlename = '${req.body.middlename}' 
        , lastname = '${req.body.lastname}' , age = ${req.body.age} WHERE userinfo_id = ${id}`);

        res.json("User info updated!");
    } catch (err) {
        console.log(err.message);
    }

})

//insert data

app.post("/CRUDapi",async(req,res) =>{
    try {
        //await
        const newUser = await pool.query(
            `INSERT INTO tbl_userinfo(firstname,middlename,lastname,age) VALUES ('${req.body.firstName}','${req.body.middleName}','${req.body.lastName}',${req.body.age})
             RETURNING *`);

        res.json(newUser.rows[0]);
        
    } catch (err) {
        console.log(err.message);
    }
})

// delete data

app.delete("/CRUDapi/:id", async(req,res) =>{
    const {id} = req.params;
    try {
        const deleteUser = await pool.query(`DELETE FROM tbl_userinfo WHERE userinfo_id = ${id}`);

        res.json("Data deleted successfully!");
    } catch (err) {
        console.log(err.message);
    }
})

app.listen(5000, () => {
    console.log("server is listening on port 5000");
});