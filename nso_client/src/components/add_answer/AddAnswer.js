import React, {useEffect, useState} from "react";
import ModalLayout from "../../layout/modal/ModalLayout";
import CloseIcon from "../../assets/icons/close.svg";
import {useSelector} from "react-redux";
import {gql, useMutation} from "@apollo/client";
import errorHandler from "../../utils/errorHandler";


const addAnswerMutationQuery = gql`
mutation addAnswer($uid:Int!,$qid:Int!,$answerDescription:String!,$email:String!,$token:String!,$searchQuery:String!) {
  addAnswer(uid:$uid,qid:$qid,answerDescription:$answerDescription,email:$email,token:$token,searchQuery:$searchQuery){
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

const AddAnswer = (props) => {
  const {uid, email, token} = useSelector((store) => store.user);
  const [answerDescription, setAnswerDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [addAnswerMutationFn] = useMutation(addAnswerMutationQuery);

  useEffect(() => {
    setErrorMessage(null);
  }, [answerDescription]);

  const addAnswer = () => {
    const {qid} = props.question;
    const payload = {
      uid,
      email,
      token,
      qid,
      answerDescription,
      searchQuery: props.searchQuery,
    };
    addAnswerMutationFn({variables: payload}).then(({data: {addAnswer}}) => {
      props.setAnswers(addAnswer);
      props.onClose();
    }).catch((err) => {
      errorHandler.errorFunction(err, setErrorMessage);
    });
  };
  return (
    <ModalLayout>
      <div
        className={"w-full"}>
        <img
          className={"absolute right-0 top-0 w-5 h-5 m-3 cursor-pointer"}
          src={CloseIcon}
          alt={"close"}
          onClick={() => props.onClose()}/>
        <div
          className={"font-medium text-xl text-center border-b py-2"}> Add
                    Answer
        </div>
        <div className={"px-4 py-2 flex flex-col items-stretch"}>
          <div
            className={"max-w-2xl my-2 overflow-hidden whitespace-nowrap overflow-ellipsis"}>
            <span
              className={"font-bold"}>Question :&nbsp;</span>{props.question.body}
          </div>
          <textarea
            className={"mb-2 px-4 py-2 grow-4 border rounded-md outline-0 hover:border-gray-600 min-h-textarea"}
            defaultValue={answerDescription}
            placeholder={"Answer"}
            onChange={(e) => setAnswerDescription(e.target.value)}/>
          {errorMessage ?
                        <span
                          className={"text-red-500 my-2 mx-auto"}>{errorMessage}</span> : null}
          <button
            className={"mb-2 py-2 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 shadow"}
            onClick={addAnswer}>Add
                        Answer
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default AddAnswer;
