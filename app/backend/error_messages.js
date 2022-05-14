const emailOrPasswordInvalid = {
  status: 401,
  message: "Incorrect email or password",
}

const emailAndPasswordRequired = {
  status: 400,
  message: "All fields must be filled"
}

const teamsMustPlayAgainstOtherTeams = {
  status: 400,
  message: "It is not possible to create a match with two equal teams"
}

const teamDoesntExist = {
  status: 400,
  message: "There is no team with such id!"
}

module.exports = {
  emailOrPasswordInvalid,
  emailAndPasswordRequired,
  teamsMustPlayAgainstOtherTeams,
  teamDoesntExist,
}