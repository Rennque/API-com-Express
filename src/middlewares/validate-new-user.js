const yup = require("yup");

const validation = yup.object().shape({
  name: yup
    .string("The name must be a string")
    .required("name is required"),
  password: yup
    .string()
    .min(10, "Password must be at least 10 characters long")
    .required("Password is required")
})

function validateNewUser(request, response, next) {
  console.log("original data", request.body)

  try {
    validation.validateSync(request.body)
    next()
  } catch (error) {
    response.status(400).json({ message: error.message })
  }
}

module.exports = validateNewUser