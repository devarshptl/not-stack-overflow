import React, {useEffect, useState} from "react";
import {removeUser} from "../../features/authentication/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import Loading from "../../components/loading/Loading";

const NavbarLayout = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const {uname} = useSelector((store) => store.user);

  // dispatch and naigation
  const navbarLayoutNavigation = useNavigate();
  const navbarLayoutDispatch = useDispatch();

  const {token} = useSelector((store) => store.user);

  useEffect(() => {
    setIsLoading(true);
    if (!token) {
      navbarLayoutNavigation("/login");
      setLoadingMessage("Redirecting to login....");
    }
    setIsLoading(false);
    setLoadingMessage("");
  }, [token]);

  return (
    <div
      className={"NavBarLayout h-screen flex flex-col"}>
      {isLoading ? <Loading message={loadingMessage}/> : null}
      <div
        className={"w-full h-max py-4 px-4 sm:px-32 md:px-48 lg:px-52 xl:px-72 2xl:px-96 bg-blue-300 shadow-xl flex justify-between items-center text-gray-700"}>
        <span
          className={"font-serif font-bold text-2xl"}>Not StackOverflow</span>
        <div className={"flex items-center"}>
          <span
            className={"h-full px-4 py-1 mr-2 rounded-full bg-gray-100 uppercase font-medium"}>
            <Link
              to={"/profile"}>{uname}
            </Link>
          </span>
          <button type={"button"}
            className={"py-1 px-4 bg-red-400 bg-red-500 rounded-full text-white"}
            onClick={() => navbarLayoutDispatch(removeUser())}>Logout
          </button>
        </div>
      </div>
      <div
        className={"relative grow px-4 sm:px-32 md:px-48 lg:px-52 xl:px-72 2xl:px-96 overflow-auto"}>
        {props.children}
      </div>
    </div>
  );
};

export default NavbarLayout;
