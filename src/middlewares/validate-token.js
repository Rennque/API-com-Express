const jwt = require('jsonwebtoken')


function validateToken(request, response, next) {
    console.log(request.headers.authorization)
    const token = request.headers.authorization

    console.log(token)

    if (!token || token === 'Bearer') {
        return response.status(403).json({ message: 'Token not present' })
    }

    const tokenJwt = token.slice(7)

    jwt.verify(tokenJwt, 'MINHA_CHAVE_SECRETA', function(error, conteudoDescodificado) {
        if (error) {
          if (error.name === 'TokenExpiredError') {
            return response.status(401).json({ error: 'Token expired' });
          } else if (error.name === 'JsonWebTokenError') {
            return response.status(401).json({ error: 'Invalid token' });
          } else {
            return response.status(500).json({ error: 'Internal server error' });
          }
        } else {
            console.log(conteudoDescodificado)
            request.body.userId = conteudoDescodificado.id
          return next();
        }
      });

}

module.exports = validateToken