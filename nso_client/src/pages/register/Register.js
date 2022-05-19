import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Loading from "../../components/loading/Loading";
import {gql, useMutation} from "@apollo/client";
import {useDispatch} from "react-redux";
import {updateUser} from "../../features/authentication/user/userSlice";
import {useNavigate} from "react-router";
import errorHandler from "../../utils/errorHandler";

const query = gql`
mutation addUser($uname:String!,$email:String!,$city:String!,$state:String!,$country:String!,$profile:String!,$pwd:String!) {
  addUser(uname:$uname, email:$email, city:$city, state:$state, country:$country, profile:$profile, pwd:$pwd) {
    uid
    uname
    token
    email
  }
}`;


const Register = () => {
  const [mutateFunction] = useMutation(query);

  // loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(null);

  // input states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [profile, setProfile] = useState("");

  // error states
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorId, setErrorId] = useState(null);

  // dispatch and navigation
  const registerDispatch = useDispatch();
  const registerNavigation = useNavigate();

  useEffect(() => {
    document.title = "Register";
    console.log("hello");
  }, []);

  useEffect(() => {
    setErrorMessage(null);
  }, [username, password, email, country]);

  useEffect(() => {
    if (errorId === "USER_ALREADY_EXISTS") {
      setErrorId(null);
      setErrorMessage(null);
    }
  }, [email]);
  useEffect(() => {
    if (errorId === "uname") {
      setErrorId(null);
      setErrorMessage(null);
    }
  }, [username]);
  useEffect(() => {
    if (errorId === "email") {
      setErrorId(null);
      setErrorMessage(null);
    }
  }, [email]);
  useEffect(() => {
    if (errorId === "pwd") {
      setErrorId(null);
      setErrorMessage(null);
    }
  }, [password]);
  useEffect(() => {
    if (errorId === "country") {
      setErrorId(null);
      setErrorMessage(null);
    }
  }, [country]);

  const registerExecute = () => {
    if (password != confirmPassword) {
      setErrorId("pwd");
      setErrorMessage("Password does not matches with confirm password.");
    } else {
      setIsLoading(true);
      setLoadingMessage("Registering as a new user....");
      mutateFunction({
        variables:
          {
            "uname": username,
            "email": email,
            "city": city,
            "state": state,
            "country": country,
            "profile": profile,
            "pwd": password,
          },
      }).then(({data}) => {
        const {addUser: user} = data;
        const payload = {
          uid: user.uid,
          uname: user.uname,
          token: user.token,
          email: user.email,
        };
        registerDispatch(updateUser(payload));
        registerNavigation("/");
      }).catch((err) => {
        try {
          const error = JSON.parse(err.message);
          if (error?.error[0]?.path) {
            setErrorId(error?.error[0]?.path);
            setErrorMessage(error?.error[0]?.message);
          } else {
            setErrorId("USER_ALREADY_EXISTS");
            setErrorMessage(error.error[0].message);
          }
        } catch (e) {
          setErrorId("FAILED_FETCH");
          setErrorMessage(err.message);
        }
      }).finally(() => {
        setIsLoading(false);
        setLoadingMessage("");
      });
    }
  };

  const returnErrorClass = (id) => {
    return id === errorId ? "border-2 border-red-500" : "";
  };

  const inputFieldData = [
    {
      id: "uname",
      type: "text",
      placeholder: "Fullname",
      onChange: setUsername,
      defaultValue: username,
    },
    {
      id: "email",
      type: "email",
      placeholder: "Email",
      onChange: setEmail,
      defaultValue: email,
    },
    {
      id: "pwd",
      type: "password",
      placeholder: "Password",
      onChange: setPassword,
      defaultValue: password,
    },
    {
      id: "pwd",
      type: "password",
      placeholder: "Confirm Password",
      onChange: setConfirmPassword,
      defaultValue: confirmPassword,
    },
    {
      id: "city",
      type: "text",
      placeholder: "City",
      onChange: setCity,
      defaultValue: city,
    },
    {
      id: "state",
      type: "text",
      placeholder: "State",
      onChange: setState,
      defaultValue: state,
    },
    {
      id: "country",
      type: "text",
      placeholder: "Country",
      onChange: setCountry,
      defaultValue: country,
    },
  ];

  return (
    <div
      className={"Login h-full w-full flex justify-center items-center bg-blue-300"}>
      {isLoading ? <Loading message={loadingMessage}/> : null}
      <div
        className={"w-1/3 px-4 py-6 bg-white rounded-lg flex flex-col justify-center items-center shadow-xl"}>
        <h1
          className={"w-full mb-4 pb-1.5 text-2xl text-center font-medium uppercase"}>Register
        </h1>
        {inputFieldData.map((inputField, key) => (
          <input type={inputField.type}
            key={key}
            className={"w-full mb-4 p-2 border border-gray-200 rounded-md hover:border-gray-600 focus:outline-0" + returnErrorClass(inputField.id)}
            placeholder={inputField.placeholder}
            onChange={(e) => inputField.onChange(e.target.value)}
            defaultValue={inputField.defaultValue}/>
        ))}
        <textarea
          className={"w-full min-h-textarea mb-4 p-2 border border-gray-200 rounded-md hover:border-gray-600 focus:outline-0"}
          placeholder={"Profile"}
          onChange={(e) => setProfile(e.target.value)}
          defaultValue={profile}
          required/>

        {errorMessage ?
          <div className={"text-red-500 mb-4"}>{errorMessage}</div> : null}

        <button type={"submit"}
          className={"w-full border-0 p-2 rounded-md outline-0 bg-red-400 text-white text-xl font-medium"}
          onClick={registerExecute}>Register
        </button>

        <div
          className={"w-full my-1 flex flex-row justify-center items-center text-gray-400"}>
          <div className={"grow h-0.5 border bg-gray-400"}></div>
          <span className={"px-2 py-1 grow-0"}>OR</span>
          <div className={"grow h-0.5 border bg-gray-400"}></div>
        </div>

        <Link
          to={"/login"}
          className={"w-full border-0 p-2 rounded-md outline-0 bg-blue-400 text-center text-white text-xl font-medium"}>Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
