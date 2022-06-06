import React from "react";
import AcceptDenied from "./options/AcceptDenied";
import CancelRequest from "./options/CancelRequest";
import Disconnect from "./options/Disconnect";
import SendRequestBlock from "./options/SendRequestBlock";
const MoreOption = (props) => {
  return (
    <>
      {props.status === "C" && <AcceptDenied />}
      {props.status === "T" && <CancelRequest />}
      {props.status === "F" && <Disconnect />}
      {props.status === "N" && (
        <SendRequestBlock
          currentID={props.currentID}
          removeBlockUser={props.removeBlockUser}
          close={props.close}
        />
      )}
    </>
  );
};

export default MoreOption;
