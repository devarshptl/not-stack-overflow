-- Create database if does not exists
-- drop database if exists not_stack_overflow;
-- create database not_stack_overflow;

-- Tables

drop table if exists levels cascade;
drop table if exists users cascade;
drop table if exists topics cascade;
drop table if exists questions cascade;
drop table if exists answers cascade;
drop table if exists votes cascade;


-- Levels
create table levels
(
    level_id    serial,
    level_title varchar(255) not null,
    req_count   bigint       not null,
    primary key (level_id)
);

insert into levels (level_title, req_count)
values ('Basics', 0),
       ('Advanced', 10),
       ('experts', 15);

-- Users
create table users
(
    uid     serial,
    uname   varchar(255) not null,
    email   varchar(255) not null,
    pwd     varchar(255) not null,
    city    varchar(30)  not null,
    state   varchar(30)  not null,
    country varchar(30)  not null,
    profile text         not null,
    primary key (uid)
);

insert into users (uname, email, pwd, city, state, country, profile)
values ('Devarsh', 'devarsh@gmail.com', 'Devarsh@1234', 'New York', 'New York', 'USA', 'Mathematics expert.'),
       ('Puru', 'puru@gmail.com', 'Puru@1234', 'York', 'New York', 'USA', 'Science expert.'),
       ('Varshil', 'varshil@gmail.com', 'Varshil@1234', 'Niagara', 'New York', 'USA', 'Physics expert.'),
       ('Anjali', 'anjali@gmail.com', 'Anjali@1234', 'Bostom', 'Massachusetts', 'USA', 'Chemistry expert.'),
       ('Hetvi', 'hetvi@gmail.com', 'Hetvi@1234', 'Medford', 'Virginia', 'USA', 'Arts expert.'),
       ('Shubh', 'shubh@gmail.com', 'Shubh@1234', 'Arlington', 'Texas', 'USA', 'Dance expert.');

-- Topics
create table topics
(
    topic_id    serial,
    topic_title text not null,
    topic_desc  text not null,
    primary key (topic_id)
);

insert into topics (topic_title, topic_desc)
values ('Physics',
        'Physics is the branch of science that deals with the structure of matter and how the fundamental constituents of the universe interact. It studies objects ranging from the very small using quantum mechanics to the entire universe using general relativity.'),
       ('Mathematics',
        'Mathematics is an area of knowledge, which includes the study of such topics as numbers, formulas and related structures, shapes and spaces in which they are contained, and quantities and their changes. There is no general consensus about its exact scope or epistemological status.'),
       ('Chemistry',
        'Chemistry is the study of substances—that is, elements and compounds—while biology is the study of living things. However, these two branches of science meet in the discipline of biochemistry, which studies the substances in living things and how they change within an organism.'),
       ('Arts',
        'The arts are a very wide range of human practices of creative expression, storytelling and cultural participation. They encompass multiple diverse and plural modes of thinking, doing and being, in an extremely broad range of media.'),
       ('History',
        'History is the study and the documentation of the past. Events before the invention of writing systems are considered prehistory. "History" is an umbrella term comprising past events as well as the memory, discovery, collection, organization, presentation, and interpretation of these events.'),
       ('Sociology',
        'Sociology is the study of social life, social change, and the social causes and consequences of human behavior. Sociologists investigate the structure of groups, organizations, and societies, and how people interact within these contexts.'),
       ('Anthropology',
        'Anthropology is the study of what makes us human. Anthropologists take a broad approach to understanding the many different aspects of the human experience, which we call holism. They consider the past, through archaeology, to see how human groups lived hundreds or thousands of years ago and what was important to them.'),
       ('Sports',
        'Sport is a great way for people of different backgrounds and cultures to join in and play a game they love. It brings people together and teaches valuable lessons such as respect, teamwork, selflessness and perseverance.'),
       ('Medicine',
        'Medicine is the branch of health science and the sector of public life concerned with maintaining human health or restoring it through the treatment of disease and injury. It is both an area of knowledge - a science of body systems, their diseases and treatment - and the applied practice of that knowledge.');


-- Questions
create table questions
(
    qid      serial,
    uid      int  not null,
    title    text not null,
    body     text not null,
    topic_id int  not null,
    resolved bool not null default false,
    primary key (qid),
    foreign key (uid) references users (uid),
    foreign key (topic_id) references topics (topic_id)
);

insert into questions (uid, title, body, topic_id)
values (1, 'Interesting and Amazing Math Facts',
        'The more one studies mathematics, the more mysterious it becomes, with powers that seem quite "spooky" and almost magical at times!',
        2),
       (1, 'Physics gives all the “how’s” in a world of “what’s.”',
        'These physics facts will either leave you with answers or even more questions about this world!', 1),
       (2, 'Science is interesting....', 'Name amazing science facts that will blow your mind!', 3),
       (1, 'Fun math facts: Math is everywhere!', 'Facts About Math for International Day of Math!', 2),
       (1, 'Mind-Blowing Historic', 'Write Fun History Facts!', 5),
       (3, 'Diversified Arts', 'FACTS ABOUT ART THAT WILL IMPRESS YOUR FRIENDS!', 4),
       (2, 'E-Commercialised Facts', 'Write facts About eCommerce That’ll Keep You Up At Night!', 2),
       (4, 'Doctors picks.', 'Are you guys nervous then write doctor facts?', 9);


-- Answers
create table answers
(
    answer_id      serial,
    qid            int not null,
    uid            int not null,
    answer_desc    text,
    best           bool      default false,
    submitted_date timestamp default current_timestamp,
    primary key (answer_id),
    foreign key (qid) references questions (qid),
    foreign key (uid) references users (uid)
);

create table votes
(
    vote_id   serial,
    answer_id int not null,
    uid       int not null,
    primary key (vote_id),
    foreign key (uid) references users (uid)
);


-- Votes
insert into votes (answer_id, uid)
values (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (2, 2),
       (2, 3),
       (2, 4),
       (3, 1),
       (3, 4),
       (3, 2),
       (3, 5),
       (4, 1),
       (4, 2),
       (4, 3),
       (5, 4),
       (5, 5),
       (5, 1),
       (6, 1),
       (6, 4),
       (6, 3),
       (7, 5),
       (7, 2),
       (7, 3),
       (7, 4),
       (8, 1),
       (9, 2),
       (9, 3),
       (10, 1),
       (10, 3),
       (10, 2),
       (11, 2),
       (11, 5),
       (12, 6),
       (13, 6),
       (14, 6),
       (14, 5),
       (14, 1),
       (15, 3),
       (15, 4),
       (16, 2),
       (18, 3),
       (18, 2),
       (19, 1),
       (19, 2),
       (19, 4),
       (20, 3),
       (22, 2),
       (23, 1),
       (23, 4),
       (23, 6),
       (24, 5),
       (27, 3),
       (27, 6),
       (29, 3),
       (29, 6),
       (29, 1),
       (30, 4),
       (30, 2),
       (31, 4),
       (34, 2);

insert into answers (qid, uid, answer_desc, best)
values (1, 2, 'Pi and pizzas are linked', false),
       (1, 3, 'Nature loves Fibonacci sequences', false),
       (1, 4, 'In a crowded room, two people probably share a birthday', true),
       (1, 5, 'Multiplying ones always gives you palindromic numbers', false),
       (1, 6, 'The universe isn''t big enough for Googolplex', false),
       (2, 2, 'Physics is the science of matter and its behavior.', false),
       (2, 4, 'Comes from the Greek word, physikḗ, which means “science of nature.”', true),
       (2, 5, 'It originated from astronomy, mathematics, and natural philosophy in 3000 B.C.', false),
       (3, 1, 'Babies have around 100 more bones than adults', false),
       (3, 3,
        'Babies have about 300 bones at birth, with cartilage between many of them. This extra flexibility helps them pass through the birth canal and also allows for rapid growth. With age, many of the bones fuse, leaving 206 bones that make up an average adult skeleton.',
        true),
       (3, 4,
        'Our atmosphere is made up of roughly 78 per cent nitrogen and 21 per cent oxygen, with various other gases present in small amounts. The vast majority of living organisms on Earth need oxygen to survive, converting it into carbon dioxide as they breathe. Thankfully, plants continually replenish our planet’s oxygen levels through photosynthesis. During this process, carbon dioxide and water are converted into energy, releasing oxygen as a by-product. Covering 5.5 million square kilometres (2.1 million square miles), the Amazon rainforest cycles a significant proportion of the Earth’s oxygen, absorbing large quantities of carbon dioxide at the same time.',
        false),
       (3, 5,
        'There are certain metals – including potassium, sodium, lithium, rubidium and caesium – that are so reactive that they oxidise (or tarnish) instantly when exposed to air. They can even produce explosions when dropped in water! All elements strive to be chemically stable – in other words, to have a full outer electron shell. To achieve this, metals tend to shed electrons. The alkali metals have only one electron on their outer shell, making them ultra-keen to pass on this unwanted passenger to another element via bonding. As a result they form compounds with other elements so readily that they don’t exist independently in nature.',
        false),
       (3, 6,
        'A neutron star is the remnants of a massive star that has run out of fuel. The dying star explodes in a supernova while its core collapses in on itself due to gravity, forming a super-dense neutron star. Astronomers measure the mind-bogglingly large masses of stars or galaxies in solar masses, with one solar mass equal to the Sun’s mass (that is, 2 x 1030 kilograms/4.4 x 1030 pounds). Typical neutron stars have a mass of up to three solar masses, which is crammed into a sphere with a radius of approximately ten kilometres (6.2 miles) – resulting in some of the densest matter in the known universe.',
        false),
       (4, 2, 'Mount Everest weighs an estimated 357 trillion pounds.', true),
       (4, 3,
        'If you’re planning a road trip, Texas is the place to be! Texas is the state with the most roads in the United States, with 679,917 total miles of lanes to get lost on.',
        false),
       (4, 5,
        'In a classroom of 23 people, there’s a 50% chance two of them have the same birthday. In a room of 75 people, the probability increases to 99%. It’s called the Birthday Problem, and here’s the solution!',
        false),
       (4, 6,
        'A baseball diamond is a perfect rhombus. A rhombus is a parallelogram with opposite equal acute angles, opposite equal obtuse angles and four equal sides.',
        false),
       (5, 3,
        'During World War II, a Great Dane named Juliana was awarded the Blue Cross Medal. She extinguished an incendiary bomb by peeing on it!',
        false),
       (5, 4,
        'Alexander the Great was accidentally buried alive. Scientists believe Alexander suffered from a neurological disorder called Guillain-Barré Syndrome. They believe that when he died he was actually just paralyzed and mentally aware!',
        true),
       (5, 5,
        'There were female Gladiators in Ancient Rome! A female gladiator was called a Gladiatrix, or Gladiatrices. They were extremely rare, unlike their male counterparts.',
        false),
       (5, 6,
        'The world’s most successful pirate in history was a lady named Ching Shih. She was a prostitute in China until the Commander of the Red Flag Fleet bought and married her. But, her husband considered her his equal and she became an active pirate commander in the fleet.',
        false),
       (6, 1,
        'The Olympics wasn’t always about abs and doping scandals. The founder of the modern Games, the Baron Pierre de Coubertin, was enamoured with the idea of the true Olympian being a talented artist and sportsperson. Thanks to him, between 1912 and 1948 medals were given out for sporting-inspired masterpieces of architecture, music, painting, sculpture and literature.',
        false),
       (6, 2,
        'Over the years many have fallen prey to the portrait’s ‘limpid and burning eyes’, leaving her offerings of flowers, poems and, yes, love notes. Artist Luc Maspero allegedly took this fervour to a new high – and then low – in 1852, diving off a hotel balcony because “For years I have grappled desperately with her smile. I prefer to die.” Who knew art appreciation could be so dark?',
        true),
       (6, 4,
        'Considering the US is one of the oldest modern democracies, this is pretty amazing. Sir Isaac Newton invented the colour wheel in 1706 by refracting white sunlight into its six colours. The realisation that light alone was responsible for colour was radical, and the wheel proved especially useful for artists, who could now easily observe the most effective colour complementation.',
        false),
       (6, 5,
        'What’s that, you say? He inhaled a painting?? The man must be enormous! Not quite. Wigan’s works are ‘micro-sculptures’, so tiny they must be viewed through a microscope. In creating his art, Wigan has to slow his heartbeat and work between pulses. The work he inhaled was Alice, from Alice in Wonderland, but apparently she was even better when remade.',
        false),
       (6, 6,
        'The prank was soon undone by its inadequate glue, but for a few hours Crimewatch UK Has Ruined the Countryside For All of Us was hung in one of the world’s most famous museums. It also inspired Andrzej Sobiepan, a Polish art student, to a similar feat in 2005, where for three days he successfully passed off his work as part of the National Museum’s collection.',
        false),
       (7, 1,
        'E-commerce actually started in 1979. Michael Aldrich connected a domestic television set with a phone line to create online shopping back, which boomed in the 1980s and 1990s before the Internet took off.',
        false),
       (7, 3,
        'Amazon launched in 1995. However, Amazon didn’t start turning a profit until 2003. The average order value as of 2012 for Amazon is $47.31, and of course, Amazon is known as one of the largest online retailers.',
        true),
       (7, 4,
        'Zappo makes money off of referrals from social media. The online retailer takes $0.75 from Pinterest, $2.08 from Facebook and $33.66 from Twitter.',
        false),
       (7, 5, 'More than 80 percent of the online population has used the Internet to purchase goods and services.',
        false),
       (8, 1,
        'In the United States alone there are nearly 700,000 physicians. In appreciation of doctors and physicians, National Doctor''s Day is celebrated on March 30 every year.',
        false),
       (8, 2,
        'Doctors are just as likely to abuse alcohol and illegal drugs as the average citizen, but are much more likely to abuse prescription drugs due to close proximity and easier procurement. They are also more likely to have a relapse later for the same reasons.',
        true),
       (8, 3, 'About 64% of physicians report working overtime. Some physicians may work as many as 60 hours per week.',
        false),
       (8, 6, 'Doctors leave sponges and other medical devices inside of their patients about 6,000 times a year.',
        false);






