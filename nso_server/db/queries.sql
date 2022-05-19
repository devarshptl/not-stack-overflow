-- Create a new user account, together with username, email, password, city, state, country, and profile.
insert into users (uname, email, pwd, city, state, country, profile)
values ('Deva', 'deva@gmail.com', 'Deva@1234', 'Salem', 'New Hampshire', 'USA', 'Best in Research');


-- Insert a new question into the system, by a particular user and assigned it to a particular topic in the hierarchy.
insert into questions (uid, title, body, topic_id)
values (3, 'Cartesian Coordinates', 'What mathematician is known for the x/y coordinate plane?', 2);


-- Write a query that computes for each user their current status (basic, advanced, or expert status) based on their answers and your own chosen criteria for defining the status.
with result as (
    with user_votes as (select u.uid as uid, u.uname as user_name, count(*) as votes
                        from votes
                                 join answers a on votes.answer_id = a.answer_id
                                 join users u on u.uid = a.uid
                        group by u.uid
                        order by count(*) desc
    )
    select *
    from user_votes
             join levels on req_count <= votes
    order by req_count desc
)
select uid as user_id, user_name, (array_agg(level_title))[1] as level
from result
group by uid, user_name;


-- For a given question (say identified by an ID), output all answers to the question in chronological order from first to last. Output the answer text and the time and date when it was posted, and whether an answer was selected as best answer.
select answers.uid          as user_id,
       q.body               as question,
       answer_desc,
       submitted_date::time as time,
       date(submitted_date) as date,
       answers.best         as is_best
from answers
         join questions q on answers.qid = q.qid
where answers.qid = 1
order by submitted_date;


-- For each topic in the topic hierarchy, output the number of questions posted and total number of answers posted within that topic.
select t.topic_id                as topic_id,
       t.topic_title             as topic_name,
       count(distinct q.qid)     as total_questions,
       count(distinct answer_id) as total_answers
from answers
         join questions q on q.qid = answers.qid
         join topics t on t.topic_id = q.topic_id
group by t.topic_id;


-- Given a keyword query, output all questions that match the query and that fall into a particular topic, sorted from highest to lowest relevance. (Select and define a suitable form of relevance – you could match the keywords against the query title, the query text, or the query answers, and possibly give different weights to these different fields.)
select title as question_title, body as question, answer_desc as answer
from answers
         join questions q on answers.qid = q.qid
         join topics t on t.topic_id = q.topic_id
where q.topic_id = (select topic_id from topics where topic_title = 'Mathematics')
  and (title like '%Math%'
    or body like '%Math%'
    or answer_desc like '%Math%')
order by title, body, answer_desc desc;
