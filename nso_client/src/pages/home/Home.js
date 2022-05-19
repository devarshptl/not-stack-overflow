import React, {useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";

// layout
import NavbarLayout from "../../layout/navbar/NavbarLayout";

// components
import Loading from "../../components/loading/Loading";
import {useSelector} from "react-redux";
import AddQuestion from "../../components/add_question/AddQuestion";
import DeleteIcon from "../../assets/icons/delete.svg";
import {useNavigate} from "react-router";
import errorHandler from "../../utils/errorHandler";

const topicQuery = gql`
query getTopics{
  topics {
    topic_id
    topic_title
    topic_desc
  }
}
`;

const questionQuery = gql`
query getQuestions($topicId:Int, $searchQuery: String!){
  questions(topicId:$topicId, searchQuery:$searchQuery){
    uid
    qid
    title
    body
    user {
      uid
      uname
    }
    topic {
      topic_title
    }
  }
}
`;

const deleteQuestionMutationQuery = gql`
mutation deleteQuestion($qid:Int!,$uid:Int!, $email:String!,$token:String!,$topicId:Int,$searchQuery:String!) {
  deleteQuestion(qid:$qid,uid:$uid,email:$email,token:$token,topicId:$topicId,searchQuery:$searchQuery){
    uid
    qid
    title
    body
    user {
      uid
      uname
    }
    topic {
      topic_title
    }
  }
}
`;

const Home = () => {
  const homeNavigate = useNavigate();

  const {uid, email, token} = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [showAddQuestionModal, toggleShowAddQuestionModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [topics, setTopics] = useState([]);
  const [personalQuestions, setPersonalQuestions] = useState([]);
  const [otherQuestions, setOtherQuestions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const {
    data: topicsData,
    error: topicsError,
    refetch: refetchTopics,
  } = useQuery(topicQuery);
  const {
    data: questionsData,
    error: questionsError,
    refetch: refetchQuestions,
  } = useQuery(questionQuery, {
    variables: {
      topicId: selectedTopic ? parseInt(selectedTopic) : null,
      searchQuery,
    },
  });
  const [deleteQuestionMutation] = useMutation(deleteQuestionMutationQuery);

  const setQuestions = (ques) => {
    if (ques) {
      const pQues = ques.filter((q) => q.uid === uid);
      const oQues = ques.filter((q) => q.uid !== uid);
      setPersonalQuestions(pQues);
      setOtherQuestions(oQues);
    }
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

  useEffect(() => {
    if (!topicsError) {
      setTopics(topicsData?.topics);
    } else {
      errorHandler.errorFunction(topicsError, setErrorMessage);
    }
  }, [topicsData]);

  useEffect(() => {
    if (!questionsError) {
      const ques = questionsData?.questions;
      setQuestions(ques);
    } else {
      errorHandler.errorFunction(questionsError, setErrorMessage);
    }
  }, [questionsData]);

  useEffect(() => {
    setErrorMessage(null);
    setIsLoading(true);
    setLoadingMessage("Fetching Questions...");
    refetchQuestions({
      topicId: selectedTopic ? parseInt(selectedTopic) : null,
      searchQuery,
    }).then(({data: {questions}}) => {
      setQuestions(questions);
    }).catch((err) => {
      errorHandler.errorFunction(err, setErrorMessage);
    }).finally(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  }, [selectedTopic, searchQuery, showAddQuestionModal]);


  const deleteQuestion = (qid) => {
    setIsLoading(true);
    setLoadingMessage("Deleting Questions...");
    const payload = {
      qid,
      uid,
      email,
      token,
      topicId: selectedTopic ? parseInt(selectedTopic) : null,
      searchQuery,
    };
    deleteQuestionMutation({variables: payload}).then(({data: {deleteQuestion}}) => {
      setQuestions(deleteQuestion);
    }).catch((err) => {
      errorHandler.errorFunction(err, setErrorMessage);
    }).finally(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  };

  const questionClicked = (question) => {
    homeNavigate("/answers", {
      state: {
        question,
      },
    });
  };

  return (
    <NavbarLayout>
      {showAddQuestionModal ?
                <AddQuestion
                  uid={uid}
                  closeFn={toggleShowAddQuestionModal}
                  topics={topics}/> : null}
      {isLoading ? <Loading message={loadingMessage}/> : null}
      <div className={"h-full overflow-auto"}>
        <div className={"Home pt-10 w-full"}>
          <div className="Search w-full mb-4 flex">
            <input
              type={"text"}
              className={"px-4 py-2 grow-4 border rounded-full outline-0 hover:border-gray-600"}
              defaultValue={searchQuery}
              placeholder={"Search"}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className={"ml-3 grow rounded-full px-4 py-2 outline-0 border hover:border-gray-600 appearance-none"}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
              }}>
              <option value={null}>Select Topic</option>
              {topics ? topics.map((topic, key) => (
                <option key={key}
                  value={topic.topic_id}>{topic.topic_title}</option>
              )) : null}
            </select>
            <button
              className={"ml-3 px-4 rounded-full bg-blue-500 text-white font-medium"}
              onClick={() => toggleShowAddQuestionModal(!showAddQuestionModal)}>Add
            </button>
          </div>
          {errorMessage ?
                        <span
                          className={"text-red-500 my-2 mx-auto"}>{errorMessage}</span> :
                        <div className={"w-full"}>
                          {personalQuestions && personalQuestions.length !== 0 ? (
                                <div className={"w-full mb-4"}>
                                  <div
                                    className={"w-full mb-2 border-b-2 text-2xl font-medium"}>Personal
                                        Questions
                                  </div>
                                  {personalQuestions.map((question, key) => (
                                    <div
                                      className={"Question my-4 bg-gray-100 flex justify-between items-stretch shadow hover:shadow-md cursor-pointer"}
                                      key={key}>
                                      <div
                                        className={"flex-1 flex justify-between items-stretch overflow-hidden"}
                                        onClick={() => questionClicked(question)}>
                                        <div
                                          className={"flex-action bg-white px-5 flex justify-center items-center"}>
                                          <span
                                            className={"text-lg font-medium"}>{question.qid}</span>
                                        </div>
                                        <div className={"flex-1 p-3 overflow-hidden"}>
                                          <div className={"flex overflow-hidden"}>
                                            <div
                                              className={"grow font-medium overflow-hidden whitespace-nowrap overflow-ellipsis"}>{question.title}</div>
                                            <span>({question.topic.topic_title})</span>
                                          </div>
                                          <p
                                            className={"font-light overflow-hidden whitespace-nowrap overflow-ellipsis"}>{question.body}</p>
                                        </div>
                                      </div>
                                      <button
                                        className={"flex-action bg-red-500 flex justify-center items-center"}
                                        onClick={() => deleteQuestion(question.qid)}>
                                        <div>
                                          <img
                                            src={DeleteIcon}
                                            alt={"delete"}
                                          />
                                        </div>
                                      </button>
                                    </div>
                                  ))}
                                </div>) : <p className={"text-center my-8"}>No personal questions found.</p>}
                          {otherQuestions && otherQuestions.length !== 0 ? (
                                <div className={"w-full mb-4"}>
                                  <div className={"w-full mb-2 border-b-2 text-2xl font-medium"}>Other
                                        Questions
                                  </div>
                                  {otherQuestions.map((question, key) => (
                                    <div
                                      className={"Question my-4 bg-gray-100 flex justify-between items-stretch shadow hover:shadow-md cursor-pointer"}
                                      key={key}>
                                      <div
                                        className={"flex-1 flex justify-between items-stretch overflow-hidden"}
                                        onClick={() => questionClicked(question)}>
                                        <div
                                          className={"flex-action bg-white px-5 flex justify-center items-center"}>
                                          <span
                                            className={"text-lg font-medium"}>{question.qid}</span>
                                        </div>
                                        <div className={"flex-1 p-3 overflow-hidden"}>
                                          <div className={"flex overflow-hidden"}>
                                            <div
                                              className={"grow font-medium overflow-hidden whitespace-nowrap overflow-ellipsis"}>{question.title}</div>
                                            <span>({question.topic.topic_title})</span>
                                          </div>
                                          <p
                                            className={"font-light overflow-hidden whitespace-nowrap overflow-ellipsis"}>{question.body}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))} </div>) : <p className={"text-center mt-8"}>No other questions found.</p>}
                        </div>}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default Home;
