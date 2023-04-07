const Place = require('../../models/chores')

async function deletePlace (request, response)  {
    try {
        await Place.destroy({
            where: {
                id: request.params.id
            }
        })

        response.status(200).json({ message: 'successfully deleted' })

    } catch (error) {
        response.status(500).json({ message: 'We were unable to process your request.' })
    }
}

module.exports = deletePlace