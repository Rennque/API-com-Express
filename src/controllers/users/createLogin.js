const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function createLogin(request, response) {

    try {
        const userInDatabase = await User.findOne({
            where: {
                cpf: request.body.cpf
            }
        })

        if (!userInDatabase) {
            return response.status(404).json({ message: 'Incorrect CPF or password' })
        }

        const passwordIsValid = await bcrypt.compare(request.body.password, userInDatabase.password)

        if (!passwordIsValid) {
            return response.status(404).json({ message: 'incorrect credentials[password]' })
        }

        const token = jwt.sign(
            {
                id: userInDatabase.id,
                name: userInDatabase.name
            },
            process.env.CHAVE_DO_TOKEN,
            {
                expiresIn: '2h'
            }
        )

        response.json({ name: userInDatabase.name, token: token })

    } catch (error) {
        response.status(500).json({ message: 'We were unable to process your request.' })
    }
}

module.exports = createLogin
