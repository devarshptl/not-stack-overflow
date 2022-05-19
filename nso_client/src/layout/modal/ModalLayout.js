import React from "react";

const ModalLayout = (props) => {
  return (
    <div
      className={"z-10 ModalLayout absolute top-0 left-0 w-screen h-full before:bg-black before:absolute before:left-0 before:top-0 before:opacity-60 before:h-full before:w-full before:-z-5 flex justify-center items-center"}>
      <div className={"z-20 w-full sm:w-600 relative bg-white rounded-lg"}>
        {props.children}
      </div>
    </div>
  );
};

export default ModalLayout;
