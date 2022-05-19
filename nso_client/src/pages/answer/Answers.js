import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import NavbarLayout from "../../layout/navbar/NavbarLayout";
import {useSelector} from "react-redux";
import Loading from "../../components/loading/Loading";
import BackLogo from "../../assets/icons/back.svg";
import {Link} from "react-router-dom";
import {gql, useMutation, useQuery} from "@apollo/client";
import AddAnswer from "../../components/add_answer/AddAnswer";
import DeleteIcon from "../../assets/icons/delete.svg";
import errorHandler from "../../utils/errorHandler";

const getAnswer = gql`
query getAnswer($qid:Int!,$searchQuery:String!){
  answers(qid:$qid,searchQuery:$searchQuery) {
    answer_id
    answer_desc
    best
    votes{
      vote_id
      user {
        uid
      }
    }
    user {
      uid
      uname
    }
  }
}
`;

const makeBestQueryMutation = gql`
mutation makeAnswerBest($qid:Int!,$answerId:Int!,$email:String!,$token:String!,$searchQuery:String!) {
  makeAnswerBest(qid:$qid,answerId:$answerId,email:$email,token:$token,searchQuery:$searchQuery) {
    answer_id
    answer_desc
    best
    votes{
      vote_id
      user {
        uid
      }
    }
    user {
      uid
      uname
    }
  }
}
`;

const toggleVoteMutation = gql`
mutation toggleVote($uid:Int!,$qid:Int!,$answerId:Int!,$email:String!,$token:String!,$searchQuery:String!) {
  toggleVote(uid:$uid,qid:$qid,answerId:$answerId,email:$email,token:$token,searchQuery:$searchQuery) {
    answer_id
    answer_desc
    best
    votes{
      vote_id
      user {
        uid
      }
    }
    user {
      uid
      uname
    }
  }
}
`;

const deleteAnswerMutationQuery = gql`
mutation deleteAnswer($uid:Int!,$qid:Int!,$answerId:Int!,$email:String!,$token:String!,$searchQuery:String!) {
  deleteAnswer(uid:$uid,qid:$qid,answerId:$answerId,email:$email,token:$token,searchQuery:$searchQuery){
    answer_id
    answer_desc
    best
    votes{
      vote_id
      user {
        uid
      }
    }
    user {
      uid
      uname
    }
  }
}
`;

const Answers = (props) => {
  const {state: {question}} = useLocation();
  const {uid, email, token} = useSelector((store) => store.user);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [answers, setAnswers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [addAnswerModal, setAddAnswerModal] = useState(false);
  const {
    data: answersData,
    error: answersErros,
    refetch: refetchAnswers,
  } = useQuery(getAnswer, {
    variables: {
      qid: parseInt(question.qid),
      searchQuery,
    },
  });
  const [makeQueryBestMutationFn] = useMutation(makeBestQueryMutation);
  const [toggleVoteMutationFn] = useMutation(toggleVoteMutation);
  const [deleteAnswerMutationFn] = useMutation(deleteAnswerMutationQuery);

  useEffect(() => {
    document.title = "Answer for: " + question.title;
  }, []);

  useEffect(() => {
    if (!answersErros) {
      if (answersData) {
        setAnswers(answersData.answers);
      }
    } else {
      console.log(answersErros);
    }
  }, [answersData]);

  useEffect(() => {
    setIsLoading(true);
    setLoadingMessage("Fetching Answers...");
    const payload = {
      qid: question.qid,
      searchQuery: searchQuery,
    };
    refetchAnswers({payload})
        .then().catch((err) => {
          errorHandler.errorFunction(err, setErrorMessage);
        }).finally(() => {
          setIsLoading(false);
          setLoadingMessage("");
        });
  }, [searchQuery]);


  const getBackGroundColor = (best) => {
    return best ? "bg-blue-600" : "bg-red-400";
  };

  const getVoteColor = (votes) => {
    const users = votes.filter((vote) => vote.user.uid === uid);
    return users.length !== 0 ? "bg-green-600" : "bg-yellow-400";
  };

  const selectBest = async (answer) => {
    if (question.user.uid === uid) {
      const payload = {
        qid: question.qid,
        answerId: answer.answer_id,
        email,
        token,
        searchQuery,
      };
      makeQueryBestMutationFn({variables: payload}).then(({data: {makeAnswerBest}}) => {
        setAnswers(makeAnswerBest);
      }).catch((err) => {
        errorHandler.errorFunction(err, setErrorMessage);
      });
    }
  };

  const toggleVote = async (answer) => {
    const payload = {
      uid,
      qid: question.qid,
      answerId: answer.answer_id,
      email,
      token,
      searchQuery,
    };
    toggleVoteMutationFn({variables: payload}).then(({data: {toggleVote}}) => {
      setAnswers(toggleVote);
    }).catch((err) => {
      errorHandler.errorFunction(err, setErrorMessage);
    });
  };

  const removeAnswer = (answer) => {
    const payload = {
      uid,
      qid: question.qid,
      answerId: answer.answer_id,
      email,
      token,
      searchQuery,
    };
    deleteAnswerMutationFn({variables: payload}).then(({data: {deleteAnswer}}) => {
      setAnswers(deleteAnswer);
    }).catch((err) => {
      errorHandler.errorFunction(err, setErrorMessage);
    });
  };

  return (
    <NavbarLayout>
      {addAnswerModal ?
        <AddAnswer
          setAnswers={setAnswers}
          searchQuery={searchQuery} question={question}
          onClose={() => setAddAnswerModal(false)}/> : null}
      {isLoading ? <Loading message={loadingMessage}/> : null}
      <div className={"w-full Answers "}>
        <Link to={"/"}>
          <div className={"my-4 flex items-center underline"}>
            <img className={"h-3 mr-2"} src={BackLogo}/>
            <span>Back Home</span>
          </div>
        </Link>
        <div className={"w-full"}>
          <div
            className={"w-full mb-2 border-b-2 text-2xl font-bold"}>
            Question
          </div>
          <div className={"mb-4"}>
            <div
              className={"relative px-2 py-1 bg-gray-200 font-medium z-0"}>
              <span className={"break-all"}>{question.title}</span>
              <span className={"absolute right-2 font-light"}><span
                className={"font-medium capitalize"}>Asked by : </span>{question?.user?.uid === uid ? "you" : question?.user?.uname}</span>
            </div>
            <div
              className={"p-2 bg-gray-100 font-light break-all"}>{question.body}</div>
          </div>
          <div
            className={"w-full mb-4 border-b-2 text-2xl font-bold"}>
            Answer
          </div>
          <div className={" mb-4 flex justify-between"}>
            <input
              type={"text"}
              className={"w-full grow px-4 py-2 grow-4 border rounded-md outline-0 hover:border-gray-600"}
              defaultValue={searchQuery}
              placeholder={"Search"}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className={"text-center ml-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:shadow hover:bg-blue-600 font-medium"}
              onClick={() => setAddAnswerModal(!addAnswerModal)}>
              Add
            </button>
          </div>
          {errorMessage ?
            <span
              className={"text-red-500 my-2 mx-auto"}>{errorMessage}</span> :
            answers && answers.length !== 0 ? <div>
              {answers.map((answer, key) => (
                <div
                  className={"shadow mb-2"}
                  key={key}>
                  <div
                    className={"flex items-stretch bg-gray-200"}
                  >
                    <div className={"p-2 grow flex items-center"}><span
                      className={"font-medium"}>Answered by : </span>{answer.user.uname}
                    </div>

                    <div className={"p-2 flex items-center"}>
                      <span><span
                        className={"font-medium"}>Votes : </span>{answer.votes.length}</span>
                      <button
                        onClick={() => selectBest(answer)}
                        className={`ml-2 px-2 py-1 rounded-lg text-white font-medium ${getBackGroundColor(answer.best)}`}>Best
                      </button>
                      <button
                        onClick={() => toggleVote(answer)}
                        className={`ml-2 px-2 py-1 rounded-lg text-white font-medium ${getVoteColor(answer.votes)}`}>Vote
                      </button>
                      {answer.user.uid === uid ? <button
                        onClick={() => removeAnswer(answer)}
                        className={"ml-2 px-2 py-1 rounded-lg text-white font-medium bg-red-500"}>
                        <img className={"w-6 h-6"} src={DeleteIcon}
                          alt={"delete"}/>
                      </button> : null}
                    </div>

                  </div>
                  <div
                    className={"p-2 break-all"}>{answer.answer_desc}</div>
                </div>
              ))}
            </div> :
              <p>No answers found.</p>}
        </div>
      </div>

    </NavbarLayout>
  );
};

export default Answers;
