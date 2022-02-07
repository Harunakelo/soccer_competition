const { response } = require('express');
const express = require ('express');
const bodyParser=require("body-parser")
const {Pool} = require ("pg");
// 
const pool = new Pool({
    user:'chief',
    host:'localhost',
    database: 'soccer_competition',
    password:'qwerty',
    port: 5432,
})

const app  = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
// app.use(express.json())
// create routes for 
// list of plsyers 
// playr details 

// list of teams 
// team details 

// matechs

//players
app.get('/players', (request,response)=>{
    pool.query('SELECT * FROM players',(error, results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
})

//players/:id eg /players/2
app.get('/players/:id',(request,response)=>{
     
    const id = request.params.id;
    
    pool.query(`SELECT * FROM players WHERE id=${id}`, (error,results) => {
        if(error){
            throw error
        }
         response.status(200).json(results.rows[0])
    })
    
})

//eams
app.get('/teams',(request,response)=>{

    pool.query('SELECT * FROM teams', (error, results) => {
        if(error) {
            throw error
        }
 
        response.status(200).json(results.rows)
    })
})

//teams/:id
app.get('/teams/:id',(request,response)=>{

    const id = request.params.id;
   
    pool.query(`SELECT * FROM teams WHERE id=${id}`, (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows[0])
    })
})


app.listen(3000, ()=>{
    console.log('my_pet')
})

function listener(){
    console.log('hello')
}


// task 
// create players table 
//