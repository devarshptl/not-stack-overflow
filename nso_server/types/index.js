const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString, GraphQLBoolean,
} = require("graphql");

const {Op} = require("sequelize");

const {Answer, Question, User, Vote, Topic} = require("../models");


const LevelType = new GraphQLObjectType({
  name: "Level",
  fields: () => ({
    level_id: {type: GraphQLInt},
    level_title: {type: GraphQLString},
    req_count: {type: GraphQLInt},
    created_at: {type: GraphQLString},
    updated_at: {type: GraphQLString},
  }),
});

const TopicType = new GraphQLObjectType({
  name: "Topic",
  fields: () => ({
    topic_id: {type: GraphQLInt},
    topic_title: {type: GraphQLString},
    topic_desc: {type: GraphQLString},
    created_at: {type: GraphQLString},
    updated_at: {type: GraphQLString},
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    uid: {type: GraphQLInt},
    uname: {type: GraphQLString},
    email: {type: GraphQLString},
    pwd: {type: GraphQLString},
    city: {type: GraphQLString},
    state: {type: GraphQLString},
    country: {type: GraphQLString},
    profile: {type: GraphQLString},
    created_at: {type: GraphQLString},
    updated_at: {type: GraphQLString},
    token: {type: GraphQLString},
    questions: {
      type: new GraphQLList(QuestionType),
      async resolve(parent, args) {
        return await Question.findAll({
          where: {
            uid: parent.uid,
          },
        });
      },
    },
    votes: {
      type: new GraphQLList(VoteType),
      async resolve(parent, args) {
        return await Vote.findAll({
          where: {
            uid: parent.uid,
          },
        });
      },
    },
  }),
});

const QuestionType = new GraphQLObjectType({
  name: "Question",
  fields: () => ({
    qid: {type: GraphQLInt},
    uid: {type: GraphQLInt},
    title: {type: GraphQLString},
    body: {type: GraphQLString},
    topic_id: {type: GraphQLInt},
    resolved: {type: GraphQLBoolean},
    created_at: {type: GraphQLString},
    updated_at: {type: GraphQLString},
    user: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findOne({
          where: {
            uid: parent.uid,
          },
        });
      },
    },
    answers: {
      type: new GraphQLList(AnswerType),
      async resolve(parent, args) {
        return await Answer.findAll({
          where: {
            qid: parent.qid,
          },
        });
      },
    },
    topic: {
      type: TopicType,
      async resolve(parent, args) {
        return await Topic.findOne({
          where: {
            topic_id: parent.topic_id,
          },
        });
      },
    },
  }),
});

const AnswerType = new GraphQLObjectType({
  name: "Answer",
  fields: () => ({
    answer_id: {type: GraphQLInt},
    qid: {type: GraphQLInt},
    uid: {type: GraphQLInt},
    answer_desc: {type: GraphQLString},
    best: {type: GraphQLBoolean},
    submitted_at: {type: GraphQLString},
    updated_at: {type: GraphQLString},
    question: {
      type: QuestionType,
      async resolve(parent, args) {
        return await Question.findOne({
          where: {
            qid: parent.qid,
          },
        });
      },
    },
    user: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findOne({
          where: {
            uid: parent.uid,
          },
        });
      },
    },
    votes: {
      type: new GraphQLList(VoteType),
      async resolve(parent, args) {
        return await Vote.findAll({
          where: {
            answer_id: parent.answer_id,
          },
        });
      },
    },
  }),
});

const VoteType = new GraphQLObjectType({
  name: "Vote",
  fields: () => ({
    vote_id: {type: GraphQLInt},
    answer_id: {type: GraphQLInt},
    uid: {type: GraphQLInt},
    created_at: {type: GraphQLString},
    updated_at: {type: GraphQLString},
    user: {
      type: UserType,
      async resolve(parent, args) {
        return await User.findOne({
          where: {
            uid: parent.uid,
          },
        });
      },
    },
    answer: {
      type: AnswerType,
      async resolve(parent, args) {
        return await Answer.findOne({
          where: {
            answer_id: parent.answer_id,
          },
        });
      },
    },
  }),
});

module.exports = {
  LevelType,
  TopicType,
  UserType,
  QuestionType,
  AnswerType,
  VoteType,
};
