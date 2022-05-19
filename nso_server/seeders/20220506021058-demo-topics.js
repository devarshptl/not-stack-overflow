"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("topics", [

      {
        topic_title: "Physics",
        topic_desc: "Physics is the branch of science that deals with the structure of matter and how the fundamental constituents of the universe interact. It studies objects ranging from the very small using quantum mechanics to the entire universe using general relativity.",
      },
      {
        topic_title: "Mathematics",
        topic_desc: "Mathematics is an area of knowledge, which includes the study of such topics as numbers, formulas and related structures, shapes and spaces in which they are contained, and quantities and their changes. There is no general consensus about its exact scope or epistemological status.",
      },
      {
        topic_title: "Chemistry",
        topic_desc: "Chemistry is the study of substances—that is, elements and compounds—while biology is the study of living things. However, these two branches of science meet in the discipline of biochemistry, which studies the substances in living things and how they change within an organism.",
      },
      {
        topic_title: "Arts",
        topic_desc: "The arts are a very wide range of human practices of creative expression, storytelling and cultural participation. They encompass multiple diverse and plural modes of thinking, doing and being, in an extremely broad range of media.",
      },
      {
        topic_title: "History",
        topic_desc: "History is the study and the documentation of the past. Events before the invention of writing systems are considered prehistory. \"History\" is an umbrella term comprising past events as well as the memory, discovery, collection, organization, presentation, and interpretation of these events.",
      },
      {
        topic_title: "Sociology",
        topic_desc: "Sociology is the study of social life, social change, and the social causes and consequences of human behavior. Sociologists investigate the structure of groups, organizations, and societies, and how people interact within these contexts.",
      },
      {
        topic_title: "Anthropology",
        topic_desc: "Anthropology is the study of what makes us human. Anthropologists take a broad approach to understanding the many different aspects of the human experience, which we call holism. They consider the past, through archaeology, to see how human groups lived hundreds or thousands of years ago and what was important to them.",
      },
      {
        topic_title: "Sports",
        topic_desc: "Sport is a great way for people of different backgrounds and cultures to join in and play a game they love. It brings people together and teaches valuable lessons such as respect, teamwork, selflessness and perseverance.",
      },
      {
        topic_title: "Medicine",
        topic_desc: "Medicine is the branch of health science and the sector of public life concerned with maintaining human health or restoring it through the treatment of disease and injury. It is both an area of knowledge - a science of body systems, their diseases and treatment - and the applied practice of that knowledge.",
      },


    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("topics", null, {});
  },
};
