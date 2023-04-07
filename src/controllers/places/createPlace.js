const Place = require('../../models/chores')

async function createPlace(request, response) {
    try {
       
        const tarefa = {
            name: request.body.name,
            contact: request.body.contact,
            opening_hours: request.body.opening_hours,
            description: request.body.description,
            latitude: request.body.latitude,
            longitude: request.body.longitude
        }

        if (!tarefa.name || !tarefa.description) {
            return response
                .status(400)
                .json({ message: 'Name/Description is required' })
        }

        const placeInDatabase = await Place.findOne(
            { where: { name: tarefa.name } }
        ) 

        if (placeInDatabase) {
            return response
                .status(400)
                .json({ message: 'A task with that name already exists' })
        }

        const newPlace = await Place.create(tarefa)

        response.status(201).json(newPlace)
    } catch (error) {
        response.status(500).json({ message: 'Does not meet your request.' })
    }
}

module.exports = createPlace
