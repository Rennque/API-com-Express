const express = require('express')//[M1S09] Ex 1
const connection = require('./src/dataBase')
const Place = require('./src/models/chores')//[M1S09] Ex 2

const app = express()

app.use(express.json()) 

connection.authenticate()
connection.sync({alter: true})

//[M1S09] Ex 3
app.post('/places', async (request, response) => {
    try {

       const data = {
        name: request.body.name,
        contact: request.body.contact,
        opening_hours: request.body.opening_hours,
        description: request.body.description,
        latitude: request.body.latitude,
        longitude: request.body.longitude
       } 

       const place = await Place.create(data)

       response.status(201).json(place)


    } catch (error) {
        console.log(error)
        response.status(500).json({message: 'Unable to complete the operation'})
    }
})

//[M1S09] Ex 4
app.get('/places', async (request, response) => {
    try {
        const places = await Place.findAll()
        return response.json(places)
    } catch (error) {
        
    }
})

//[M1S09] Ex 5
app.delete('/places/:id', async (request, response) => {
    console.log(request.params.id)
    
     await Place.destroy({
        where:{
            id: request.params.id
        }
    })
    response.status(204).json()
})

//[M1S09] Ex 6
app.put('./src/models:id', async (req, res) => {
    let description = req.body.description;
    models[req.params.id] = description;
    return res.json(models[req.params.id]);
});

//[M1S09] Ex 1
app.listen(9999, () => {
    console.log("Online Server")
})