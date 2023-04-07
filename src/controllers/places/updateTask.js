const Place = require('../../models/chores')


async function updatePlace (request, response) {

    try {

        const placeInDatabase = await Place.findByPk(request.params.id) 

        if (!placeInDatabase) {
            return response
                .status(404)
                .json({ message: 'task not found' })
        }

        placeInDatabase.name = request.body.name || placeInDatabase.name
        placeInDatabase.description = request.body.description || placeInDatabase.description

        await placeInDatabase.save() 

        response.json(placeInDatabase)

    } catch (error) {
        response.status(500).json({ message: 'We were unable to process your request.' })
    }

}

module.exports = updatePlace