const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList, GraphQLString,
} = require("graphql");

const {Op} = require("sequelize");

const _ = require("lodash");

const {Answer, User, Topic, Question, Vote} = require("../models");

const {
  AnswerType, UserType, TopicType, QuestionType,
} = require("../types");
const {errorCodes} = require("../constants/error_codes");
const {catchErrorHandling, normalErrorThrow} = require("../utils/error_handling");

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    login: {
      type: UserType,
      args: {email: {type: GraphQLString}, pwd: {type: GraphQLString}},
      async resolve(parent, {email, pwd}, {jwtEncrypt, comparePassword}) {
        const user = await User.findOne({
          where: {
            email,
          },
        });

        if (user) {
          if (comparePassword(pwd, user.pwd)) {
            user.token = await jwtEncrypt({uid: user.uid, email: email});
            return user;
          } else {
            normalErrorThrow(errorCodes.INVALID_PASSWORD);
          }
        } else {
          normalErrorThrow(errorCodes.USER_DOES_NOT_EXISTS);
        }
      },
    },
    profile: {
      type: UserType,
      args: {email: {type: GraphQLString}, token: {type: GraphQLString}},
      async resolve(parent, {email, token}, {jwtEncrypt, jwtDecrypt}) {
        const decryptedToken = jwtDecrypt(token);
        if (email !== decryptedToken.email) {
          normalErrorThrow(errorCodes.INVALID_TOKEN);
        } else {
          const user = await User.findOne({where: {email}});
          if (!user) {
            normalErrorThrow(errorCodes.USER_DOES_NOT_EXISTS);
          } else {
            user.token = await jwtEncrypt({uid: user.uid, email: user.email});
            return user;
          }
        }
      },
    },
    topics: {
      type: new GraphQLList(TopicType),
      async resolve(parent, args) {
        return await Topic.findAll();
      },
    },
    questions: {
      type: new GraphQLList(QuestionType),
      args: {topicId: {type: GraphQLInt}, searchQuery: {type: GraphQLString}},
      async resolve(parent, {topicId, searchQuery}) {
        let whereClause = {};
        if (topicId) whereClause = {...whereClause, topic_id: topicId};
        if (searchQuery && searchQuery !== "") {
          whereClause = {
            ...whereClause,
            [Op.or]: {
              title: {[Op.like]: `%${searchQuery}%`},
              body: {[Op.like]: `%${searchQuery}%`},
            },
          };
        }
        return await Question.findAll({
          where: whereClause,
        });
      },
    },
    answers: {
      type: new GraphQLList(AnswerType),
      args: {qid: {type: GraphQLInt}, searchQuery: {type: GraphQLString}},
      async resolve(parent, {qid, searchQuery}) {
        let whereClause = {};
        whereClause.qid = qid;
        if (searchQuery && searchQuery !== "") {
          whereClause = {
            ...whereClause, answer_desc: {[Op.like]: `%${searchQuery}%`},
          };
        }
        const answers = await Answer.findAll({
          where: whereClause,
        });
        return _.sortBy(answers, ["answer_id"]);
      },
    },
  },
});

const RootMutation = new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        uname: {type: GraphQLString},
        email: {type: GraphQLString},
        pwd: {type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        country: {type: GraphQLString},
        profile: {type: GraphQLString},
      },
      async resolve(parent, args, {jwtEncrypt, hashPassword}) {
        if (args.email && args.email === "") {
          normalErrorThrow(errorCodes.EMPTY_EMAIL);
        }
        const oldemails = await User.findOne({
          where: {
            email: args.email,
          },
        });
        if (oldemails) {
          normalErrorThrow(errorCodes.USER_ALREADY_EXISTS);
        } else {
          const newUserData = {...args, pwd: hashPassword(args.pwd)};
          const newUser = User.build(newUserData);
          const user = await newUser.save().then((user) => {
            return user;
          }).catch((err) => {
            catchErrorHandling(err, errorCodes.VALIDATION_ERR);
          });
          user.token = await jwtEncrypt({uid: user.uid, email: user.email});
          return user;
        }
      },
    },
    updateUser: {
      type: UserType,
      args: {
        uid: {type: GraphQLInt},
        uname: {type: GraphQLString},
        email: {type: GraphQLString},
        city: {type: GraphQLString},
        state: {type: GraphQLString},
        country: {type: GraphQLString},
        profile: {type: GraphQLString},
        token: {type: GraphQLString},
      },
      async resolve(parent, {
        uid,
        uname,
        email,
        city,
        state,
        country,
        profile,
        token,
      }, {jwtEncrypt, jwtDecrypt}) {
        const decryptedToken = jwtDecrypt(token);
        if (email !== decryptedToken.email) {
          normalErrorThrow(errorCodes.INVALID_TOKEN);
        } else {
          const user = await User.findOne({where: {email}});
          if (!user) {
            normalErrorThrow(errorCodes.USER_DOES_NOT_EXISTS);
          } else {
            const updatedUser = await User.update({
              uname,
              city,
              state,
              country,
              profile,
            }, {
              where: {
                uid: user.uid,
                email: user.email,
              },
            }).then(async (result) => {
              return await User.findOne({where: {uid: user.uid}});
            }).catch((err) => {
              catchErrorHandling(err, errorCodes.USER_NOT_UPDATED);
            });
            updatedUser.token = await jwtEncrypt({uid: updatedUser.uid, email: updatedUser.email});
            return updatedUser;
          }
        }
      },
    },
    addQuestion: {
      type: QuestionType,
      args: {
        uid: {type: GraphQLInt},
        email: {type: GraphQLString},
        token: {type: GraphQLString},
        title: {type: GraphQLString},
        body: {type: GraphQLString},
        topicId: {type: GraphQLInt},
      },
      async resolve(parent, {uid, email, token, title, body, topicId}, {jwtDecrypt}) {
        const decryptedToken = jwtDecrypt(token);
        if (email !== decryptedToken.email) {
          normalErrorThrow(errorCodes.INVALID_TOKEN);
        } else {
          const user = await User.findOne({where: {email}});
          if (!user) {
            normalErrorThrow(errorCodes.USER_DOES_NOT_EXISTS);
          } else {
            const newQuestionPayload = {
              uid,
              title,
              body,
              topic_id: topicId,
            };
            const newQuestion = Question.build(newQuestionPayload);
            return await newQuestion.save().then((question) => question).catch((err) => {
              catchErrorHandling(err, errorCodes.QUESTION_ADD_ERROR);
            });
          }
        }
      },
    },
    deleteQuestion: {
      type: new GraphQLList(QuestionType),
      args: {
        qid: {type: GraphQLInt},
        uid: {type: GraphQLInt},
        email: {type: GraphQLString},
        token: {type: GraphQLString},
        topicId: {type: GraphQLInt},
        searchQuery: {type: GraphQLString},
      },
      async resolve(parent, {qid, uid, email, token, topicId, searchQuery}, {jwtDecrypt}) {
        const decryptedToken = jwtDecrypt(token);
        if (email !== decryptedToken.email) {
          normalErrorThrow(errorCodes.INVALID_TOKEN);
        } else {
          const user = await User.findOne({where: {email}});
          if (!user) {
            normalErrorThrow(errorCodes.USER_DOES_NOT_EXISTS);
          } else {
            await Question.findOne({
              where: {
                qid,
                uid,
              },
            }).then(async (question) => {
              await question.destroy().catch((err) => {
                catchErrorHandling(err, errorCodes.QUESTION_DELETE_ERROR);
              });
            }).catch((err) => {
              console.log(err);
              catchErrorHandling(err, errorCodes.QUESTION_ERROR);
            });
            let whereClause = {};
            if (topicId) whereClause = {...whereClause, topic_id: topicId};
            if (searchQuery && searchQuery !== "") {
              whereClause = {
                ...whereClause,
                [Op.or]: {
                  title: {[Op.like]: `%${searchQuery}%`},
                  body: {[Op.like]: `%${searchQuery}%`},
                },
              };
            }
            return await Question.findAll({
              where: whereClause,
            });
          }
        }
      },
    },
    makeAnswerBest: {
      type: new GraphQLList(AnswerType),
      args: {
        answerId: {type: GraphQLInt},
        qid: {type: GraphQLInt},
        email: {type: GraphQLString},
        token: {type: GraphQLString},
        searchQuery: {type: GraphQLString},
      },
      async resolve(parent, {email, token, answerId, qid, searchQuery}, {jwtDecrypt}) {
        const decryptedToken = jwtDecrypt(token);
        if (email !== decryptedToken.email) {
          normalErrorThrow(errorCodes.INVALID_TOKEN);
        } else {
          const user = await User.findOne({where: {email}});
          if (!user) {
            normalErrorThrow(errorCodes.USER_DOES_NOT_EXISTS);
          } else {
            await Answer.findOne({
              where: {
                answer_id: answerId,
                qid: qid,
              },
            }).then(async (answer) => {
              const {best} = answer;
              if (best) {
                await Answer.update({
                  best: false,
                }, {
                  where: {
                    answer_id: answerId,
                  },
                }).then().catch((err) => {
                  catchErrorHandling(err, errorCodes.ANSWER_UPDATE_ERROR);
                });
              } else {
                await Answer.update({
                  best: false,
                }, {
                  where: {
                    qid: qid,
                  },
                }).then(async () => {
                  await Answer.update({
                    best: true,
                  }, {
                    where: {
                      answer_id: answerId,
                    },
                  }).then().catch((err) => {
                    catchErrorHandling(err, errorCodes.ANSWER_UPDATE_ERROR);
                  });
                }).catch((err) => {
                  catchErrorHandling(err, errorCodes.ANSWER_UPDATE_ERROR);
                });
              }
            }).catch((err) => {
              catchErrorHandling(err, errorCodes.ANSWER_ERROR);
            });
            const whereClause = {};
            whereClause.qid = qid;
            if (searchQuery && searchQuery !== "") {
              whereClause.answer_desc = {[Op.like]: `%${searchQuery}%`};
            }
            const answers = await Answer.findAll({
              where: whereClause,
            });
            return _.sortBy(answers, ["answer_id"]);
          }
        }
      },
    },
    toggleVote: {
      type: new GraphQLList(AnswerType),
      args: {
        uid: {type: GraphQLInt},
        answerId: {type: GraphQLInt},
        qid: {type: GraphQLInt},
        email: {type: GraphQLString},
        token: {type: GraphQLString},
        searchQuery: {type: GraphQLString},
      },
      async resolve(parent, {uid, answerId, qid, email, token, searchQuery}, {jwtDecrypt}) {
        const decryptedToken = jwtDecrypt(token);
        if (email !== decryptedToken.email) {
          normalErrorThrow(errorCodes.INVALID_TOKEN);
        } else {
          const user = await User.findOne({where: {email}});
          if (!user) {
            normalErrorThrow(errorCodes.USER_DOES_NOT_EXISTS);
          } else {
            await Vote.findOne({
              where: {
                uid,
                answer_id: answerId,
              },
            }).then(async (vote) => {
              if (vote) {
                await vote.destroy();
              } else {
                const payload = {
                  uid,
                  answer_id: answerId,
                };
                const newVote = Vote.build(payload);
                await newVote.save().then().catch((err) => {
                  catchErrorHandling(err, errorCodes.VOTE_NOT_ADDED);
                });
              }
            }).catch((err) => {
              catchErrorHandling(err, errorCodes.VOTE_ERROR);
            });
            const whereClause = {};
            whereClause.qid = qid;
            if (searchQuery && searchQuery !== "") {
              whereClause.answer_desc = {[Op.like]: `%${searchQuery}%`};
            }
            const answers = await Answer.findAll({
              where: whereClause,
            });
            return _.sortBy(answers, ["answer_id"]);
          }
        }
      },
    },
    addAnswer: {
      type: new GraphQLList(AnswerType),
      args: {
        uid: {type: GraphQLInt},
        qid: {type: GraphQLInt},
        email: {type: GraphQLString},
        token: {type: GraphQLString},
        searchQuery: {type: GraphQLString},
        answerDescription: {type: GraphQLString},
      },
      async resolve(parent, {uid, answerDescription, qid, email, token, searchQuery}, {jwtDecrypt}) {
        const decryptedToken = jwtDecrypt(token);
        if (email !== decryptedToken.email) {
          normalErrorThrow(errorCodes.INVALID_TOKEN);
        } else {
          const user = await User.findOne({where: {email}});
          if (!user) {
            normalErrorThrow(errorCodes.USER_DOES_NOT_EXISTS);
          } else if (answerDescription === "") {
            normalErrorThrow(errorCodes.ANSWER_EMPTY);
          } else {
            const newAnswerPayload = {
              uid,
              qid,
              answer_desc: answerDescription,
            };
            const newAnswer = Answer.build(newAnswerPayload);
            await newAnswer.save().then().catch((err) => {
              catchErrorHandling(err, errorCodes.ANSWER_NOT_CREATED);
            });

            const whereClause = {};
            whereClause.qid = qid;
            if (searchQuery && searchQuery !== "") {
              whereClause.answer_desc = {[Op.like]: `%${searchQuery}%`};
            }
            const answers = await Answer.findAll({
              where: whereClause,
            });
            return _.sortBy(answers, ["answer_id"]);
          }
        }
      },
    },
    deleteAnswer: {
      type: new GraphQLList(AnswerType),
      args: {
        uid: {type: GraphQLInt},
        qid: {type: GraphQLInt},
        answerId: {type: GraphQLInt},
        email: {type: GraphQLString},
        token: {type: GraphQLString},
        searchQuery: {type: GraphQLString},
      },
      async resolve(parent, {uid, qid, answerId, email, token, searchQuery}, {jwtDecrypt}) {
        const decryptedToken = jwtDecrypt(token);
        if (email !== decryptedToken.email) {
          normalErrorThrow(errorCodes.INVALID_TOKEN);
        } else {
          const user = await User.findOne({where: {email}});
          if (!user) {
            normalErrorThrow(errorCodes.USER_DOES_NOT_EXISTS);
          } else {
            const deletedAnswerPayload = {
              uid,
              qid,
              answer_id: answerId,
            };
            await Answer.findOne({where: deletedAnswerPayload}).then(async (answer) => {
              if (answer) {
                await answer.destroy();
              } else {
                normalErrorThrow(errorCodes.ANSWER_ERROR);
              }
            }).catch((err) => {
              catchErrorHandling(err, errorCodes.ANSWER_ERROR);
            });

            const whereClause = {};
            whereClause.qid = qid;
            if (searchQuery && searchQuery !== "") {
              whereClause.answer_desc = {[Op.like]: `%${searchQuery}%`};
            }
            const answers = await Answer.findAll({
              where: whereClause,
            });
            return _.sortBy(answers, ["answer_id"]);
          }
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});
