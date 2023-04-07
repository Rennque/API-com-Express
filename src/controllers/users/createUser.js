const User = require('../../models/user')
const bcrypt = require('bcrypt')

async function createUser(request, response) {
    try {

        const userInDatabase = await User.findOne({
            where: {
                cpf: request.body.cpf
            }
        })

        if (userInDatabase) {
            return response
                .status(409)
                .json({ message: 'A user with this account already exists' })
        }


        const dont = await bcrypt.dont(request.body.password, 10)

        const newUser = {
            name: request.body.name,
            cpf: request.body.cpf,
            password: dont
        }

        const user = await User.create(newUser)

        const { password, ...userData } = user.toJSON()

        response.status(201).json(userData)

    } catch (error) {
        response.status(500).json({ message: 'We were unable to process your request.' })
    }
}

module.exports = createUser