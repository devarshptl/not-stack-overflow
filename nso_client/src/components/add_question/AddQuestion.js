import React, {useEffect, useState} from "react";
import ModalLayout from "../../layout/modal/ModalLayout";

import CloseIcon from "../../assets/icons/close.svg";
import {gql, useMutation} from "@apollo/client";
import {useSelector} from "react-redux";

import errorHandler from "../../utils/errorHandler.js";

const addQuestionMutationQuery = gql`
mutation addQuestion($uid:Int!, $email:String!,$token:String!,$title:String!,$body:String!,$topicId:Int!) {
  addQuestion(uid:$uid,email:$email,token:$token,title:$title,body:$body,topicId:$topicId){
    qid
    title
    body
    topic_id
  }
}
`;

const AddQuestion = (props) => {
  const {uid, email, token} = useSelector((store) => store.user);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [title, setTitle] = useState(null);
  const [body, setBody] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [addQuestionMutation] = useMutation(addQuestionMutationQuery);

  const addQuestion = () => {
    const payload = {
      uid: parseInt(uid),
      email,
      token,
      title,
      body,
      topicId: parseInt(selectedTopic),
    };
    addQuestionMutation({variables: payload}).then(({data: {addQuestion}}) => {
      props.closeFn(false);
    }).catch((err) => {
      errorHandler.errorFunction(err, setErrorMessage);
    });
  };

  useEffect(() => {
    setErrorMessage(null);
  }, [title, body, selectedTopic]);

  return (
    <ModalLayout>
      <div
        className={"w-full"}>
        <img
          className={"absolute right-0 top-0 w-5 h-5 m-3 cursor-pointer"}
          src={CloseIcon}
          alt={"close"}
          onClick={() => props.closeFn(false)}/>
        <div
          className={"font-medium text-xl text-center border-b py-2"}> Add
                    Question
        </div>
        <div className={"px-4 py-2 flex flex-col items-stretch"}>
          <select
            className={"my-4 rounded-full px-4 py-2 outline-0 border hover:border-gray-600 appearance-none outline-0"}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
            }}>
            <option value={null}>Select Topic</option>
            {props?.topics ? props.topics.map((topic, key) => (
              <option key={key}
                value={topic.topic_id}>{topic.topic_title}</option>
            )) : null}
          </select>
          <input
            type={"text"}
            className={"mb-4 px-4 py-2 grow-4 border rounded-md outline-0 hover:border-gray-600"}
            defaultValue={title}
            placeholder={"Title"}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={"mb-2 px-4 py-2 grow-4 border rounded-md outline-0 hover:border-gray-600 min-h-textarea"}
            defaultValue={body}
            placeholder={"Body"}
            onChange={(e) => setBody(e.target.value)}/>
          {errorMessage ?
                        <span className={"text-red-500 my-2"}>{errorMessage}</span> : null}
          <button
            className={"mb-2 py-2 bg-blue-600 rounded text-white font-medium hover:bg-blue-700 shadow"}
            onClick={addQuestion}>Add
                        Question
          </button>
        </div>
      </div>
    </ModalLayout>
  );
};

export default AddQuestion;
