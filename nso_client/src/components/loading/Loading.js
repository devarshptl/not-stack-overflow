import React from "react";

// icons
import LoadingSvg from "../../assets/icons/loading.svg";

const Loading = ({message}) => {
  return (
    <div
      className={"absolute top-0 w-full h-full Loading flex flex-col justify-center items-center bg-white opacity-95"}>
      <img src={LoadingSvg} className={"w-20 animate-spin"}/>
      {message != "" ? <span className={"text-lg"}>{message}</span> : null}
    </div>
  );
};

export default Loading;
