"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("questions", [
      {
        uid: 1,
        title: "Interesting and Amazing Math Facts",
        body: "The more one studies mathematics, the more mysterious it becomes, with powers that seem quite \"spooky\" and almost magical at times!",
        topic_id: 2,
      },
      {
        uid: 1,
        title: "Physics gives all the “how’s” in a world of “what’s.”",
        body: "These physics facts will either leave you with answers or even more questions about this world!",
        topic_id: 1,
      },
      {
        uid: 2,
        title: "Science is interesting....",
        body: "Name amazing science facts that will blow your mind!",
        topic_id: 3,
      },
      {
        uid: 1,
        title: "Fun math facts: Math is everywhere!",
        body: "Facts About Math for International Day of Math!",
        topic_id: 2,
      },
      {
        uid: 1,
        title: "Mind-Blowing Historic",
        body: "Write Fun History Facts!",
        topic_id: 5,
      },
      {
        uid: 3,
        title: "Diversified Arts",
        body: "FACTS ABOUT ART THAT WILL IMPRESS YOUR FRIENDS!",
        topic_id: 4,
      },
      {
        uid: 2,
        title: "E-Commercialised Facts",
        body: "Write facts About eCommerce That’ll Keep You Up At Night!",
        topic_id: 2,
      },
      {
        uid: 4,
        title: "Doctors picks.",
        body: "Are you guys nervous then write doctor facts?",
        topic_id: 9,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("questions", null, {});
  },
};
