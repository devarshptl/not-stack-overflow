"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("answers", [
      {
        qid: 1,
        uid: 2,
        answer_desc: "Pi and pizzas are linked",
        best: false,
      },
      {
        qid: 1,
        uid: 3,
        answer_desc: "Nature loves Fibonacci sequences",
        best: false,
      },
      {
        qid: 1,
        uid: 4,
        answer_desc: "In a crowded room, two people probably share a birthday",
        best: true,
      },
      {
        qid: 1,
        uid: 5,
        answer_desc: "Multiplying ones always gives you palindromic numbers",
        best: false,
      },
      {
        qid: 1,
        uid: 6,
        answer_desc: "The universe isn't big enough for Googolplex",
        best: false,
      },
      {
        qid: 2,
        uid: 2,
        answer_desc: "Physics is the science of matter and its behavior.",
        best: false,
      },
      {
        qid: 2,
        uid: 4,
        answer_desc: "Comes from the Greek word, physikḗ, which means “science of nature.”",
        best: true,
      },
      {
        qid: 2,
        uid: 5,
        answer_desc: "It originated from astronomy, mathematics, and natural philosophy in 3000 B.C.",
        best: false,
      },
      {
        qid: 3,
        uid: 1,
        answer_desc: "Babies have around 100 more bones than adults",
        best: false,
      },
      {
        qid: 3,
        uid: 3,
        answer_desc: "Babies have about 300 bones at birth, with cartilage between many of them. This extra flexibility helps them pass through the birth canal and also allows for rapid growth. With age, many of the bones fuse, leaving 206 bones that make up an average adult skeleton.",
        best: true,
      },
      {
        qid: 3,
        uid: 4,
        answer_desc: "Our atmosphere is made up of roughly 78 per cent nitrogen and 21 per cent oxygen, with various other gases present in small amounts. The vast majority of living organisms on Earth need oxygen to survive, converting it into carbon dioxide as they breathe. Thankfully, plants continually replenish our planet’s oxygen levels through photosynthesis. During this process, carbon dioxide and water are converted into energy, releasing oxygen as a by-product. Covering 5.5 million square kilometres (2.1 million square miles), the Amazon rainforest cycles a significant proportion of the Earth’s oxygen, absorbing large quantities of carbon dioxide at the same time.",
        best: false,
      },
      {
        qid: 3,
        uid: 5,
        answer_desc: "There are certain metals – including potassium, sodium, lithium, rubidium and caesium – that are so reactive that they oxidise (or tarnish) instantly when exposed to air. They can even produce explosions when dropped in water! All elements strive to be chemically stable – in other words, to have a full outer electron shell. To achieve this, metals tend to shed electrons. The alkali metals have only one electron on their outer shell, making them ultra-keen to pass on this unwanted passenger to another element via bonding. As a result they form compounds with other elements so readily that they don’t exist independently in nature.",
        best: false,
      },
      {
        qid: 3,
        uid: 6,
        answer_desc: "A neutron star is the remnants of a massive star that has run out of fuel. The dying star explodes in a supernova while its core collapses in on itself due to gravity, forming a super-dense neutron star. Astronomers measure the mind-bogglingly large masses of stars or galaxies in solar masses, with one solar mass equal to the Sun’s mass (that is, 2 x 1030 kilograms/4.4 x 1030 pounds). Typical neutron stars have a mass of up to three solar masses, which is crammed into a sphere with a radius of approximately ten kilometres (6.2 miles) – resulting in some of the densest matter in the known universe.",
        best: false,
      },
      {
        qid: 4,
        uid: 2,
        answer_desc: "Mount Everest weighs an estimated 357 trillion pounds.",
        best: true,
      },
      {
        qid: 4,
        uid: 3,
        answer_desc: "If you’re planning a road trip, Texas is the place to be! Texas is the state with the most roads in the United States, with 679,917 total miles of lanes to get lost on.",
        best: false,
      },
      {
        qid: 4,
        uid: 5,
        answer_desc: "In a classroom of 23 people, there’s a 50% chance two of them have the same birthday. In a room of 75 people, the probability increases to 99%. It’s called the Birthday Problem, and here’s the solution!",
        best: false,
      },
      {
        qid: 4,
        uid: 6,
        answer_desc: "A baseball diamond is a perfect rhombus. A rhombus is a parallelogram with opposite equal acute angles, opposite equal obtuse angles and four equal sides.",
        best: false,
      },
      {
        qid: 5,
        uid: 3,
        answer_desc: "During World War II, a Great Dane named Juliana was awarded the Blue Cross Medal. She extinguished an incendiary bomb by peeing on it!",
        best: false,
      },
      {
        qid: 5,
        uid: 4,
        answer_desc: "Alexander the Great was accidentally buried alive. Scientists believe Alexander suffered from a neurological disorder called Guillain-Barré Syndrome. They believe that when he died he was actually just paralyzed and mentally aware!",
        best: true,
      },
      {
        qid: 5,
        uid: 5,
        answer_desc: "There were female Gladiators in Ancient Rome! A female gladiator was called a Gladiatrix, or Gladiatrices. They were extremely rare, unlike their male counterparts.",
        best: false,
      },
      {
        qid: 5,
        uid: 6,
        answer_desc: "The world’s most successful pirate in history was a lady named Ching Shih. She was a prostitute in China until the Commander of the Red Flag Fleet bought and married her. But, her husband considered her his equal and she became an active pirate commander in the fleet.",
        best: false,
      },
      {
        qid: 6,
        uid: 1,
        answer_desc: "The Olympics wasn’t always about abs and doping scandals. The founder of the modern Games, the Baron Pierre de Coubertin, was enamoured with the idea of the true Olympian being a talented artist and sportsperson. Thanks to him, between 1912 and 1948 medals were given out for sporting-inspired masterpieces of architecture, music, painting, sculpture and literature.",
        best: false,
      },
      {
        qid: 6,
        uid: 2,
        answer_desc: "Over the years many have fallen prey to the portrait’s ‘limpid and burning eyes’, leaving her offerings of flowers, poems and, yes, love notes. Artist Luc Maspero allegedly took this fervour to a new high – and then low – in 1852, diving off a hotel balcony because “For years I have grappled desperately with her smile. I prefer to die.” Who knew art appreciation could be so dark?",
        best: true,
      },
      {
        qid: 6,
        uid: 4,
        answer_desc: "Considering the US is one of the oldest modern democracies, this is pretty amazing. Sir Isaac Newton invented the colour wheel in 1706 by refracting white sunlight into its six colours. The realisation that light alone was responsible for colour was radical, and the wheel proved especially useful for artists, who could now easily observe the most effective colour complementation.",
        best: false,
      },
      {
        qid: 6,
        uid: 5,
        answer_desc: "What’s that, you say? He inhaled a painting?? The man must be enormous! Not quite. Wigan’s works are ‘micro-sculptures’, so tiny they must be viewed through a microscope. In creating his art, Wigan has to slow his heartbeat and work between pulses. The work he inhaled was Alice, from Alice in Wonderland, but apparently she was even better when remade.",
        best: false,
      },
      {
        qid: 6,
        uid: 6,
        answer_desc: "The prank was soon undone by its inadequate glue, but for a few hours Crimewatch UK Has Ruined the Countryside For All of Us was hung in one of the world’s most famous museums. It also inspired Andrzej Sobiepan, a Polish art student, to a similar feat in 2005, where for three days he successfully passed off his work as part of the National Museum’s collection.",
        best: false,
      },
      {
        qid: 7,
        uid: 1,
        answer_desc: "E-commerce actually started in 1979. Michael Aldrich connected a domestic television set with a phone line to create online shopping back, which boomed in the 1980s and 1990s before the Internet took off.",
        best: false,
      },
      {
        qid: 7,
        uid: 3,
        answer_desc: "Amazon launched in 1995. However, Amazon didn’t start turning a profit until 2003. The average order value as of 2012 for Amazon is $47.31, and of course, Amazon is known as one of the largest online retailers.",
        best: true,
      },
      {
        qid: 7,
        uid: 4,
        answer_desc: "Zappo makes money off of referrals from social media. The online retailer takes $0.75 from Pinterest, $2.08 from Facebook and $33.66 from Twitter.",
        best: false,
      },
      {
        qid: 7,
        uid: 5,
        answer_desc: "More than 80 percent of the online population has used the Internet to purchase goods and services.",
        best: false,
      },
      {
        qid: 8,
        uid: 1,
        answer_desc: "In the United States alone there are nearly 700,000 physicians. In appreciation of doctors and physicians, National Doctor's Day is celebrated on March 30 every year.",
        best: false,
      },
      {
        qid: 8,
        uid: 2,
        answer_desc: "Doctors are just as likely to abuse alcohol and illegal drugs as the average citizen, but are much more likely to abuse prescription drugs due to close proximity and easier procurement. They are also more likely to have a relapse later for the same reasons.",
        best: true,
      },
      {
        qid: 8,
        uid: 3,
        answer_desc: "About 64% of physicians report working overtime. Some physicians may work as many as 60 hours per week.",
        best: false,
      },
      {
        qid: 8,
        uid: 6,
        answer_desc: "Doctors leave sponges and other medical devices inside of their patients about 6,000 times a year.",
        best: false,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("answers", null, {});
  },
};
