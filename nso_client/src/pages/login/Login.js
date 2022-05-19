import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../components/loading/Loading";
import {gql, useQuery} from "@apollo/client";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {updateUser} from "../../features/authentication/user/userSlice";
import errorHandler from "../../utils/errorHandler";

// const query = gql(`
//   query login($username: ID!, $pwd: String!) {
//     login (username: $username, pwd: $pwd) {
//       uname
//       uid
//       token
//   }}`);

const query = gql`
query Login($email: String!, $pwd: String!) {
    login(email: $email, pwd: $pwd) {
      uid
      uname
      token
      email
    }
}`;


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const {refetch} = useQuery(query, {
    variables: {email, pwd},
    skip: true,
  });

  const loginDispatch = useDispatch();
  const loginNavigate = useNavigate();

  const loginExecute = async () => {
    const variables = {email, pwd};
    setIsLoading(true);
    setLoadingMessage("Authenticating...");
    await refetch(variables).then((result) => {
      const payload = {
        uid: result.data.login.uid,
        uname: result.data.login.uname,
        token: result.data.login.token,
        email: result.data.login.email,
      };
      loginDispatch(updateUser(payload));
      loginNavigate("/");
    }).catch((err) => {
      errorHandler.errorFunction(err, setErrorMessage);
    }).finally(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  };

  useEffect(() => {
    document.title = "Login";
  }, []);
  useEffect(() => {
    setErrorMessage(null);
  }, [email, pwd]);

  const inputFieldData = [
    {
      type: "email",
      placeholder: "Email",
      onChange: setEmail,
      defaultValue: email,
    },
    {
      type: "password",
      placeholder: "Password",
      onChange: setPwd,
      defaultValue: pwd,
    },
  ];

  return (
    <div
      className={"Login h-full w-full flex justify-center items-center bg-blue-300"}>
      {isLoading ? <Loading message={loadingMessage}/> : null}
      <div
        className={"w-1/3 px-4 py-6 bg-white rounded-lg flex flex-col justify-center items-center shadow-xl"}>
        <h1
          className={"w-full mb-4 pb-1.5 text-2xl text-center font-medium uppercase"}>Login
        </h1>
        {inputFieldData.map((inputField, key) => (
          <input type={inputField.type}
            key={key}
            className={"w-full mb-4 p-2 border border-gray-200 rounded-md hover:border-gray-600 focus:outline-0"}
            placeholder={inputField.placeholder}
            onChange={(e) => inputField.onChange(e.target.value)}
            defaultValue={inputField.defaultValue}/>
        ))}
        {errorMessage ?
          <div className={"text-red-500 mb-4"}>{errorMessage}</div> : null}
        <button type={"submit"}
          className={"w-full border-0 p-2 rounded-md outline-0 bg-blue-400 text-white text-xl font-medium"}
          onClick={() => loginExecute()}>Login
        </button>

        <div
          className={"w-full my-1 flex flex-row justify-center items-center text-gray-400"}>
          <div className={"grow h-0.5 border bg-gray-400"}></div>
          <span className={"px-2 py-1 grow-0"}>OR</span>
          <div className={"grow h-0.5 border bg-gray-400"}></div>
        </div>

        <Link
          to={"/register"}
          className={"w-full border-0 p-2 rounded-md outline-0 bg-red-400 text-center text-white text-xl font-medium"}>Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
