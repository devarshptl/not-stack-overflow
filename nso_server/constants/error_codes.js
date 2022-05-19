exports.errorCodes = {
  USER_DOES_NOT_EXISTS: "USER_DOES_NOT_EXISTS",
  USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
  INVALID_PASSWORD: "INVALID_PASSWORD",
  VALIDATION_ERR: "VALIDATION_ERR",
  SERVER_ERROR: "SERVER_ERROR",
  EMPTY_EMAIL: "EMPTY_EMAIL",
  INVALID_TOKEN: "INVALID_TOKEN",
  USER_NOT_UPDATED: "USER_NOT_UPDATED",
  QUESTION_ADD_ERROR: "QUESTION_ADD_ERROR",
  QUESTION_ERROR: "QUESTION_ERROR",
  QUESTION_DELETE_ERROR: "QUESTION_DELETE_ERROR",
  ANSWER_ERROR: "ANSWER_ERROR",
  ANSWER_UPDATE_ERROR: "ANSWER_UPDATE_ERROR",
  VOTE_NOT_ADDED: "VOTE_NOT_ADDED",
  VOTE_ERROR: "VOTE_ERROR",
  ANSWER_NOT_CREATED: "ANSWER_NOT_CREATED",
  ANSWER_EMPTY: "ANSWER_EMPTY",
};

exports.errorDetails = {
  USER_DOES_NOT_EXISTS: {
    message: "User does not exists.",
    statusCode: 403,
  },
  USER_ALREADY_EXISTS: {
    message: "User is already exists.",
    statusCode: 403,
  },
  INVALID_PASSWORD: {
    message: "Please enter valid password.",
    statusCode: 403,
  },
  SERVER_ERROR: {
    message: "Server error.",
    statusCode: 500,
  },
  EMPTY_EMAIL: {
    message: "Enter valid Email ID.",
    statusCode: 403,
  },
  INVALID_TOKEN: {
    message: "Invalid Token",
    statusCode: 403,
  },
  USER_NOT_UPDATED: {
    message: "User not updated.",
    statusCode: 403,
  },
  QUESTION_ADD_ERROR: {
    message: "Question insertion failed.",
    statusCode: 403,
  },
  QUESTION_ERROR: {
    message: "Question not found.",
    statusCode: 403,
  },
  QUESTION_DELETE_ERROR: {
    message: "Question not deleted.",
    statusCode: 403,
  },
  ANSWER_ERROR: {
    message: "Answer Not Found",
    statusCode: 403,
  },
  ANSWER_UPDATE_ERROR: {
    message: "Answer not updated.",
    statusCode: 403,
  },
  VOTE_NOT_ADDED: {
    message: "Vote not added.",
    statusCode: 403,
  },
  VOTE_ERROR: {
    message: "Vote error.",
    statusCode: 403,
  },
  ANSWER_NOT_CREATED: {
    message: "Answer not created.",
    statusCode: 403,
  },
  ANSWER_EMPTY: {
    message: "Answer cannot be empty.",
    statusCode: 403,
  },
};
