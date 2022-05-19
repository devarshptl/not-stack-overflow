"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        uname: "Devarsh",
        email: "devarsh@gmail.com",
        pwd: "$2b$12$vr3Dm7loL5hHCidCvMxmiuPkOe2R1mHxC65w0F5v6x.afCYfIJ18.",
        city: "New York",
        state: "New York",
        country: "USA",
        profile: "Mathematics expert.",
      },
      {
        uname: "Puru",
        email: "puru@gmail.com",
        pwd: "$2b$12$vr3Dm7loL5hHCidCvMxmiuPkOe2R1mHxC65w0F5v6x.afCYfIJ18.",
        city: "York",
        state: "New York",
        country: "USA",
        profile: "Science expert.",
      },
      {
        uname: "Varshil",
        email: "varshil@gmail.com",
        pwd: "$2b$12$vr3Dm7loL5hHCidCvMxmiuPkOe2R1mHxC65w0F5v6x.afCYfIJ18.",
        city: "Niagara",
        state: "New York",
        country: "USA",
        profile: "Physics expert.",
      },
      {
        uname: "Anjali",
        email: "anjali@gmail.com",
        pwd: "$2b$12$vr3Dm7loL5hHCidCvMxmiuPkOe2R1mHxC65w0F5v6x.afCYfIJ18.",
        city: "Bostom",
        state: "Massachusetts",
        country: "USA",
        profile: "Chemistry expert.",
      },
      {
        uname: "Hetvi",
        email: "hetvi@gmail.com",
        pwd: "$2b$12$vr3Dm7loL5hHCidCvMxmiuPkOe2R1mHxC65w0F5v6x.afCYfIJ18.",
        city: "Medford",
        state: "Virginia",
        country: "USA",
        profile: "Arts expert.",
      },
      {
        uname: "Shubh",
        email: "shubh@gmail.com",
        pwd: "$2b$12$vr3Dm7loL5hHCidCvMxmiuPkOe2R1mHxC65w0F5v6x.afCYfIJ18.",
        city: "Arlington",
        state: "Texas",
        country: "USA",
        profile: "Dance expert.",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
