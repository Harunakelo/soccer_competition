const { response } = require('express');
const express = require ('express');
const bodyParser=require("body-parser")
const {Pool} = require ("pg");
const { request } = require('http');
// 
const pool = new Pool({
    user:'chief',
    host:'localhost',
    database: 'soccer_competition',
    password:'qwerty',
    port: 5432,
})

const app  = express();
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)
app.use(bodyParser.json())
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
//Post players
app.post('/players/',(request,response)=>{ 
    const {first_name, last_name, position, nationality, team_id }=request.body

     pool.query('INSERT INTO players(first_name, last_name, position, nationality, team_id) VALUES ($1, $2,$3, $4, $5)', [first_name, last_name, position, nationality, team_id], (error, result) =>{
         if (error){
             throw(error)
         }
        
         response.status(201).send(`player added with ID: ${result.insert_id}`)
     })
    
})

//Update players/:id
app.put('/players/:id', (request,response)=>{
    const {first_name, last_name, position, nationality, team_id}=request.body
    const id=request.params.id
    console.log(first_name, last_name, position, nationality, team_id,id)

    pool.query('UPDATE players SET first_name = $1, last_name = $2, position = $3, nationality = $4, team_id = $5 WHERE id = $6',[first_name, last_name, position, nationality, team_id, id], (error, results)=>{
        if(error){
        throw(error)
        }
        response.status(200).send(`players modified with ID: ${results.id}`)
    })
} )

//teams
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

//matches
app.get('/matches',(request,response)=>{

    pool.query('SELECT * FROM matches', (error, results) => {
        if (error){
            throw error
        }
        response.status(200).json(results.rows)
    })
})

  //to edit players
  app.put  





app.listen(3000, ()=>{
    console.log('my_pet')
})

function listener(){
    console.log('hello')
}


//this a test