const Place = require('../../models/chores')

async function findPlaces (request, response)  {
    try {
        const places = await Place.findAll({
            where: {
            user_id: request.body.userId
        }})
        response.json(places)
    } catch (error) {
        response.status(500).json({ message: 'We were unable to process your request.' })
    }
}

module.exports = findPlaces