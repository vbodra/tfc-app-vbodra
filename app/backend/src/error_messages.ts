export const invalidEmailOrPassword = {
  status: 401,
  message: 'Incorrect email or password',
};

export const emailAndPasswordRequired = {
  status: 400,
  message: 'All fields must be filled',
};

export const teamsMustPlayAgainstOtherTeams = {
  status: 400,
  message: 'It is not possible to create a match with two equal teams',
};

export const teamDoesntExist = {
  status: 400,
  message: 'There is no team with such id!',
};

export const inProgressMustBeTrue = {
  status: 400,
  message: 'Field inProgress must be true',
};

export const tokenNotFound = {
  status: 401,
  message: 'Token not found',
};
