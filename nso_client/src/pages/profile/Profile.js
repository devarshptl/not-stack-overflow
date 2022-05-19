import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {gql, useMutation, useQuery} from "@apollo/client";

// component
import Loading from "../../components/loading/Loading";

// layout
import NavbarLayout from "../../layout/navbar/NavbarLayout";

// svg
import BackLogo from "../../assets/icons/back.svg";
import {updateUser} from "../../features/authentication/user/userSlice";
import errorHandler from "../../utils/errorHandler";

const profileQuery = gql`
query Profile($email: String!, $token: String!){
  profile(email:$email, token:$token) {
    uid
    uname
    email
    city
    country
    state
    profile
    token
  }
}
`;

const updateUserMutation = gql`
mutation updateUser($uid:Int!, $uname:String!,$email:String!,$city:String!,$state:String!,$country:String!,$profile:String!, $token:String!) {
  updateUser(uid:$uid, uname:$uname, email:$email, city:$city, state:$state, country:$country, profile:$profile, token:$token) {
    uid
    uname
    email
    city
    country
    state
    profile
    token
  }
}
`;

const Profile = () => {
  // dispatch and navigation
  const profileDispatch = useDispatch();

  useEffect(() => {
    document.title = "Profile";
  }, []);


  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const {email, token} = useSelector((store) => store.user);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);

  // query && mutation
  const {data, error} = useQuery(profileQuery, {
    variables: {
      email, token,
    },
  });
  const [updateUserMutationFn] = useMutation(updateUserMutation, {
    variables: {
      uid: user?.uid,
      uname: user?.uname,
      email: user?.email,
      city: user?.city,
      state: user?.state,
      country: user?.country,
      profile: user?.profile,
      token: user?.token,
    },
    skip: true,
  });

  useEffect(() => {
    if (!error) {
      if (data !== undefined) {
        const {profile} = data;
        const payload = {
          uid: profile.uid,
          uname: profile.uname,
          email: profile.email,
          token: profile.token,
        };
        profileDispatch(updateUser(payload));
        setUser(profile);
      }
    } else {
      errorHandler.errorFunction(err, setErrorMessage);
    }
  }, [data]);

  const inputFieldData = [
    {
      type: "text",
      newClass: "hover:border-gray-600",
      placeholder: "Username",
      defaultValue: user?.uname,
      disabled: false,
      onChange: (val) => setUser({...user, uname: val}),
    },
    {
      type: "email",
      newClass: "",
      placeholder: "Email",
      defaultValue: user?.email,
      disabled: true,
      onChange: (val) => setUser({...user}),
    },
    {
      type: "text",
      newClass: "hover:border-gray-600",
      placeholder: "City",
      defaultValue: user?.city,
      disabled: false,
      onChange: (val) => setUser({...user, city: val}),
    },
    {
      type: "text",
      newClass: "hover:border-gray-600",
      placeholder: "State",
      defaultValue: user?.state,
      disabled: false,
      onChange: (val) => setUser({...user, state: val}),
    },
    {
      type: "text",
      newClass: "hover:border-gray-600",
      placeholder: "Country",
      defaultValue: user?.country,
      disabled: false,
      onChange: (val) => setUser({...user, country: val}),
    },
  ];

  const updateProfile = async () => {
    setIsLoading(true);
    setLoadingMessage("Updating your profile...");
    const payload = {
      uid: user?.uid,
      uname: user?.uname,
      email: user?.email,
      city: user?.city,
      country: user?.country,
      state: user?.state,
      profile: user?.profile,
      token: user?.token,
    };
    await updateUserMutationFn(payload).then(({data}) => {
      const payload = {
        uid: data.updateUser.uid,
        uname: data.updateUser.uname,
        email: data.updateUser.email,
        token: data.updateUser.token,
      };
      profileDispatch(updateUser(payload));
      setUser(data.updateUser);
    }).catch((err) => {
      errorHandler.errorFunction(err, setErrorMessage);
    }).finally(() => {
      setIsLoading(false);
      setLoadingMessage("");
    });
  };

  useEffect(()=> {
    setErrorMessage(null);
  }, [user]);

  return (
    <NavbarLayout>
      {isLoading ? <Loading message={loadingMessage}/> : null}
      <div className={"w-full Profile"}>
        <Link to={"/"}>
          <div className={"my-4 flex items-center underline"}>
            <img className={"h-3 mr-2"} src={BackLogo}/>
            <span>Back Home</span>
          </div>
        </Link>
        <div className={"w-full"}>
          <div
            className={"w-full mb-4 border-b-2 text-2xl font-bold"}>User Profile
          </div>
          {user ?
              <div className={"w-full"}>
                {inputFieldData.map((inputField, key) => (
                  <div className={"w-full"} key={key}>
                    <label
                      className={"font-medium"}>{inputField.placeholder}</label>
                    <input
                      type={inputField.type}
                      className={"w-full mb-4 p-2 border border-gray-200 rounded-md focus:outline-0 " + inputField.newClass}
                      id={inputField.placeholder}
                      defaultValue={inputField.defaultValue}
                      onChange={(e) => inputField.onChange(e.target.value)}
                      disabled={inputField.disabled}/>
                  </div>
                ))}
                <label
                  className={"font-medium"}>Profile</label>
                <textarea
                  className={"w-full min-h-textarea mb-2 p-2 border border-gray-200 rounded-md focus:outline-0 hover:border-gray-600"}
                  defaultValue={user.profile}
                  onChange={(e) => setUser({...user, profile: e.target.value})}
                />
                {errorMessage ?
                  <div
                    className={"w-full text-red-500 my-2 mx-auto text-center"}>{errorMessage}</div> : null}
                <button
                  className={"w-full p-3 bg-blue-600 rounded text-white font-medium"}
                  onClick={updateProfile}>Update
                  Profile
                </button>
              </div> :
              <div className={""}>
                <span>No user details available.</span>
              </div>}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default Profile;
